const UpdateEmployeeForm = () => {
  return (
    <>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Nome"
      />
      <input
        type="text"
        name="cpf"
        value={formData.cpf}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="CPF"
      />
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Cargo"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="Descrição"
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        className="border p-2 rounded"
        placeholder="URL da foto de perfil"
      />
    </>
  );
};

export default UpdateEmployeeForm;
