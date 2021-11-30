const updateOrderFormElements = document.querySelectorAll(
  '.order-actions form'
);

async function updateOrder(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');
  const csrfToken = formData.get('_csrf');

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newStatus: newStatus,
        _csrf: csrfToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Algo salio mal - no se pudo actualizar el estado del pedido');
    return;
  }

  if (!response.ok) {
    alert('Algo salio mal- no se pudo actualizar el estado del pedido');
    return;
  }

  const responseData = await response.json();

  form.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener('submit', updateOrder);
}
