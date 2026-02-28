import { useState } from "react";

function AddItemForm({ onAddItem, disabled, placeholder }) {
  const [itemName, setItemName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled && itemName.trim()) {
      onAddItem(itemName);
      setItemName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder={placeholder || "Enter an item..."}
        disabled={disabled}
      />
      <button type="submit" disabled={!itemName.trim() || disabled}>
        Add Item
      </button>
      {disabled && (
        <span style={{ marginLeft: "1em", color: "#888" }}>Limit reached</span>
      )}
    </form>
  );
}

export default AddItemForm;
