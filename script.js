document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("itemInput");
    const addButton = document.getElementById("addItem");
    const select = document.getElementById("itemSelect");
    const tableBody = document.querySelector("#itemTable tbody");
    const markButton = document.getElementById("markItem");
    const unmarkButton = document.getElementById("unmarkItem");
    const removeButton = document.getElementById("removeItem");

    addButton.addEventListener("click", addItem);
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") addItem();
    });
    markButton.addEventListener("click", () => updateItem("mark"));
    unmarkButton.addEventListener("click", () => updateItem("unmark"));
    removeButton.addEventListener("click", () => updateItem("remove"));

    function addItem() {
        const itemText = input.value.trim();
        if (itemText === "") return;

        // Criar linha da tabela
        const row = document.createElement("tr");
        row.innerHTML = `<td>${itemText}</td>`;
        tableBody.appendChild(row);

        // Adicionar item ao <select>
        const option = new Option(itemText, itemText);
        select.appendChild(option);

        input.value = "";
    }

    function updateItem(action) {
        const selectedValue = select.value;
        if (!selectedValue) {
            alert("Selecione um item primeiro.");
            return;
        }

        const rows = tableBody.querySelectorAll("tr");
        let found = false;

        rows.forEach(row => {
            if (row.cells[0].textContent === selectedValue) {
                found = true;
                if (action === "mark") {
                    row.style.backgroundColor = "yellow";
                } else if (action === "unmark") {
                    if (row.style.backgroundColor !== "yellow") {
                        alert("O item já está desmarcado!");
                    } else {
                        row.style.backgroundColor = "";
                    }
                } else if (action === "remove") {
                    row.remove();
                    select.querySelector(`option[value="${selectedValue}"]`).remove();
                }
            }
        });

        if (!found) alert("Item não encontrado.");
    }
});
