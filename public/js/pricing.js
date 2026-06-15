document.addEventListener('DOMContentLoaded', () => {
    const visitsSlider = document.getElementById('visitsSlider');
    const billingToggle = document.getElementById('billingToggle');
    const priceAmount = document.querySelector('.price-amount');
    const pricePeriod = document.querySelector('.price-period');
    const priceDesc = document.querySelector('.price-desc');
    const badgeBilling = document.querySelector('.badge-billing');

    const plans = [
        { 
            monthlyPrice: 29, 
            annualPrice: 19 
        },
        { 
            monthlyPrice: 49, 
            annualPrice: 29 
        },
        { 
            monthlyPrice: 99, 
            annualPrice: 59 
        },
        { 
            monthlyPrice: 179, 
            annualPrice: 99 
        },
        { 
            monthlyPrice: 299, 
            annualPrice: 169 
        },
        { 
            monthlyPrice: 649, 
            annualPrice: 349 
        },
        { 
            monthlyPrice: 'Contact us', 
            annualPrice: 'Contact us' 
        }
    ];

    function updatePricing() {
        const value = parseInt(visitsSlider.value, 10);
        const plan = plans[value];
        const isAnnual = billingToggle.checked;
        
        // Update slider track background
        // The thumb is 32px wide, so its center travels from 16px to calc(100% - 16px).
        // We use CSS calc to make the gradient transition exactly at the thumb's center.
        const valRatio = value / visitsSlider.max;
        const cssPercentage = `calc(16px + (100% - 32px) * ${valRatio})`;
        
        // The custom SVG thumb has a 6px transparent padding for drop shadow on a 42px width.
        // Scaled to 32px, this padding is ~4.5px. We make the track transparent in this 4.5px gap
        // so the track perfectly aligns with the visual edge of the thumb without sticking out.
        visitsSlider.style.background = `linear-gradient(to right, transparent 0%, transparent 4.5px, #FF4B1E 4.5px, #FF4B1E ${cssPercentage}, #E9E9E9 ${cssPercentage}, #E9E9E9 calc(100% - 4.5px), transparent calc(100% - 4.5px), transparent 100%)`;

        if (plan.monthlyPrice === 'Custom') {
            priceAmount.textContent = 'Custom';
            pricePeriod.style.display = 'none';
            badgeBilling.textContent = 'Custom Plan';
            priceDesc.textContent = 'Contact us for a tailored plan based on your exact needs. We offer custom features and volume discounts for large businesses.';
        } else {
            pricePeriod.style.display = 'inline';
            if (isAnnual) {
                priceAmount.textContent = '$' + plan.annualPrice;
                badgeBilling.textContent = 'Annually with up to 30% OFF';
                const totalAnnual = plan.annualPrice * 12;
                priceDesc.textContent = `An amount of $${totalAnnual} will be charged immediately and subsequently every 12 months. Additional taxes may apply based on your local tax regulations.`;
            } else {
                priceAmount.textContent = '$' + plan.monthlyPrice;
                badgeBilling.textContent = 'Monthly Plan';
                priceDesc.textContent = `An amount of $${plan.monthlyPrice} will be charged every month. Additional taxes may apply based on your local tax regulations.`;
            }
        }
    }

    visitsSlider.addEventListener('input', updatePricing);
    billingToggle.addEventListener('change', updatePricing);

    // Initial call to set the right styles and content
    updatePricing();
});
