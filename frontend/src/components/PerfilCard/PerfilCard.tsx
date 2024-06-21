import { useState } from "react";
import Modal from "react-modal";
import { FormProject } from "../FormProject/FormProject";

// Definindo estilos personalizados para o modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px", 
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
    padding: "20px",
  },
};

// Definindo o elemento da aplicação para acessibilidade
Modal.setAppElement("#root"); // Substitua "#root" pelo seu elemento raiz da aplicação

export function PerfilCard() {
  const [modalIsOpen, setIsOpen] = useState(false);

  // Função para abrir o modal
  function openModal() {
    setIsOpen(true);
  }

  // Função para fechar o modal
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container mx-auto">
      <main className="flex justify-center mt-8">
        <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row gap-6">
          <div className="w-28 md:w-32 max-w-32">
            <img
              src="/Perfil.png"
              alt="Perfil Usuário"
              className="w-full h-auto rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <h5 className="text-xl font-bold">John Doe</h5>
              <p className="text-sm text-gray-500">Brasil</p>
            </div>
            <div className="h-11">
              <button
                className="bg-gray-200 text-gray-500 w-full h-full rounded-md"
                onClick={openModal}
              >
                Adicionar Projeto
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal de Exemplo"
              >
                <FormProject />
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
