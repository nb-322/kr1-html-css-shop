const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (selectedProductInput) {
                selectedProductInput.value = button.dataset.product;
            }

            if (successMessage) {
                successMessage.hidden = true;
            }

            orderDialog.showModal();
        });
    });
}

if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });

            orderForm.reportValidity();
            return;
        }

        if (successMessage) {
            successMessage.hidden = false;
        }

        orderForm.reset();

        if (orderDialog && orderDialog.open) {
            orderDialog.close();
        }
    });
}
