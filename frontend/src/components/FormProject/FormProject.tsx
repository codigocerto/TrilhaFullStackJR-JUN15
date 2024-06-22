import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const createUserFormSchema = z.object({
  title: z.string().min(1, "Titulo é obrigatório."),
  category: z.string().min(1, "Categoria é obrigatório."),
  link: z.string().min(1, "Link é obrigatório."),
  tag: z.array(z.string()).nonempty("Pelo menos uma tag é necessária."),
  img: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => file && file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function FormProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: CreateUserFormData) => {
    console.log(data);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCancel = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = () => {
    console.log("Cancelado!");
    window.location.href = "/";
  };

  const handleCancelModalClose = () => {
    setShowConfirmation(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("img", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex p-4 h-full bg-branco-trilha items-center justify-center text-yellow-50 font-bold">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-2xl text-black"
      >
        <div className="flex gap-10">
          <section className="flex-1 flex items-center justify-center">
            <div className="w-full h-full max-w-xs max-h-xs bg-white rounded-lg border border-gray-300 flex items-center justify-center relative overflow-hidden">
              <input
                {...register("img")}
                type="file"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-gray-500">Upload Image</p>
              )}
            </div>
            {errors.img?.message && (
              <span className="text-red-600">{errors.img.message}</span>
            )}
          </section>
          <section className="flex-2">
            <div className="flex gap-3 p-2">
              <label htmlFor="title">Titulo: </label>
              <input
                className="border w-full"
                type="text"
                {...register("title")}
                aria-invalid={!!errors.title}
              />
              {errors.title?.message && (
                <span className="text-red-600">{errors.title.message}</span>
              )}
            </div>
            <div className="flex gap-3 p-2 ">
              <label htmlFor="category">Categoria: </label>
              <input
                className="border w-full"
                type="text"
                {...register("category")}
                aria-invalid={!!errors.category}
              />
              {errors.category?.message && (
                <span className="text-red-600">{errors.category.message}</span>
              )}
            </div>
            <div className="flex gap-3 p-2">
              <label htmlFor="link">Link: </label>
              <input
                className="border w-full"
                type="text"
                {...register("link")}
                aria-invalid={!!errors.link}
              />
              {errors.link?.message && (
                <span className="text-red-600">{errors.link.message}</span>
              )}
            </div>
            <div className="flex gap-3 p-2">
              <label htmlFor="tag">Tags: </label>
              <input
                className="border w-full"
                type="text"
                {...register("tag")}
                aria-invalid={!!errors.tag}
              />
              {errors.tag?.message && (
                <span className="text-red-600">{errors.tag.message}</span>
              )}
            </div>
          </section>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <button
            type="submit"
            className="w-20 bg-sky-600 rounded font-semibold text-white h-10 hover:bg-sky-700"
          >
            ENVIAR
          </button>
          <div>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-20 h-10 rounded"
              onClick={handleCancel}
            >
              SAIR
            </button>
          </div>
        </div>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg text-black">
              <p>Deseja realmente cancelar?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCancelModalClose}
                >
                  Não
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleConfirmCancel}
                >
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </main>
  );
}
