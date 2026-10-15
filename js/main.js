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

const catalogFilters = document.getElementById('catalog-filters');
const catalogStatus = document.getElementById('catalog-status');
const catalogCards = document.querySelectorAll('.catalog-products .product-card');

function applyCatalogFilters() {
    const checked = Array.from(catalogFilters.querySelectorAll('input[name="category"]:checked'))
        .map((input) => input.value);
    const showAll = checked.length === 0 || checked.includes('all');
    const priceFrom = Number(catalogFilters.querySelector('#price-from').value) || 0;
    const priceTo = Number(catalogFilters.querySelector('#price-to').value) || Infinity;

    let visible = 0;

    catalogCards.forEach((card) => {
        const price = Number(card.dataset.price);
        const matchesCategory = showAll || checked.includes(card.dataset.category);
        const matchesPrice = price >= priceFrom && price <= priceTo;
        const matches = matchesCategory && matchesPrice;

        card.classList.toggle('product-card--hidden', !matches);

        if (matches) {
            visible += 1;
        }
    });

    catalogStatus.textContent = visible === 0
        ? 'Ничего не найдено, измените условия фильтра'
        : `Показано товаров: ${visible} из ${catalogCards.length}`;
}

if (catalogFilters && catalogStatus && catalogCards.length > 0) {
    catalogFilters.addEventListener('submit', (event) => {
        event.preventDefault();
        applyCatalogFilters();
    });

    catalogFilters.addEventListener('reset', () => {
        window.setTimeout(applyCatalogFilters, 0);
    });
}
