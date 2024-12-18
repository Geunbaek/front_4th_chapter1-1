function Input({ type, placeholder, value, onChange, ...props }) {
  const handleChangeValue = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      {...props}
      class="w-full p-2 border rounded"
      type={type}
      placeholder={placeholder}
      value={value}
      onInput={handleChangeValue}
    />
  );
}

export default Input;
