document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.querySelector('.product-list');
    const priceFilter = document.getElementById('price-filter');
    const priceValueDisplay = document.getElementById('price-value');
    const sortFilter = document.getElementById('sort-filter'); // New sort dropdown

    let allProducts = [];

    // (This function remains unchanged)
    const renderProducts = (products) => {
        productListContainer.innerHTML = '';
        if (products.length === 0) {
            productListContainer.innerHTML = '<p class="no-results">No products match your criteria.</p>';
            return;
        }
        products.forEach(product => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="contents">
                    <div class="product-content-title">
                        <p>${product.category}</p>
                        <h1>${product.name}</h1>
                    </div>
                    <div class="product-list-price">
                        <h1>$${product.price}</h1>
                    </div>
                </div>
            `;
            productListContainer.appendChild(cardElement);
        });
    };
    
    const updateSliderBackground = () => {
        const min = priceFilter.min;
        const max = priceFilter.max;
        const value = priceFilter.value;
        const percentage = ((value - min) / (max - min)) * 100;
        priceFilter.style.setProperty('--price-percent', `${percentage}%`);
    };

    const applyFiltersAndSort = () => {
        const maxPrice = parseInt(priceFilter.value);
        const sortValue = sortFilter.value;

        priceValueDisplay.textContent = `$${maxPrice}`;
        updateSliderBackground();

        let processedProducts = [...allProducts];

        processedProducts = processedProducts.filter(product => product.price <= maxPrice);

        if (sortValue === 'price-desc') {
            processedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'price-asc') {
            processedProducts.sort((a, b) => a.price - b.price);
        }

        renderProducts(processedProducts);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            allProducts = await response.json();

            const maxPriceInData = Math.ceil(Math.max(...allProducts.map(p => p.price)) / 10) * 10;
            priceFilter.max = maxPriceInData;
            priceFilter.value = maxPriceInData;

            applyFiltersAndSort();

        } catch (error) {
            console.error("Could not fetch products:", error);
            productListContainer.innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
        }
    };

    
    
    priceFilter.addEventListener('input', applyFiltersAndSort);
    sortFilter.addEventListener('change', applyFiltersAndSort);

    fetchProducts();
});