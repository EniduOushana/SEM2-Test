document.addEventListener('DOMContentLoaded', () => {
    const order = JSON.parse(localStorage.getItem('currentOrder')) || {};
    const orderDetails = document.getElementById('orderDetails');
    const summaryTotal = document.getElementById('summaryTotal');

    // Load order summary
    let total = 0;
    for (const item in order) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${capitalizeFirstLetter(item)}</td>
            <td>${order[item].quantity}</td>
            <td>$${order[item].price.toFixed(2)}</td>
        `;
        orderDetails.appendChild(row);
        total += order[item].price;
    }
    summaryTotal.textContent = `$${total.toFixed(2)}`;

    // Handle Pay button
    const payButton = document.getElementById('payButton');
    payButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (!fullName || !email || !address || !paymentMethod) {
            alert('Please fill out all fields.');
            return;
        }

        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);

        alert(`Thank you for your purchase, ${fullName}!\nYour order will be delivered by ${deliveryDate.toDateString()}.`);
        localStorage.removeItem('currentOrder');
        window.location.href = 'home.html';
    });

    // Utility function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
