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
        },
        { 
            monthlyPrice: 49, 
        },
        { 
            monthlyPrice: 99, 
        },
        { 
            monthlyPrice: 179, 
        },
        { 
            monthlyPrice: 299, 
        },
        { 
            monthlyPrice: 649, 
        },
        { 
            monthlyPrice: 'Contact us', 
        }
    ];

    function calcAnnualPrice() {
        const saleOff = 3/10;
        plans.forEach(plan => {
            if (plan.monthlyPrice !== 'Contact us') {
                plan.annualPrice = Math.round(plan.monthlyPrice * (1 - saleOff));
            } else {
                plan.annualPrice = 'Contact us';
            }
        });
    }

    function updatePricing() {
        const value = parseInt(visitsSlider.value, 10);
        const plan = plans[value];
        const isAnnual = billingToggle.checked;
        
       
        const valRatio = value / visitsSlider.max;
        const cssPercentage = `calc(16px + (100% - 32px) * ${valRatio})`;
        
       
        visitsSlider.style.background = `linear-gradient(to right, transparent 0%, transparent 4.5px, #FF4B1E 4.5px, #FF4B1E ${cssPercentage}, #E9E9E9 ${cssPercentage}, #E9E9E9 calc(100% - 4.5px), transparent calc(100% - 4.5px), transparent 100%)`;

        if (plan.monthlyPrice === 'Contact us') {
            priceAmount.textContent = 'Contact us';
            pricePeriod.style.display = 'none';
            badgeBilling.textContent = isAnnual ? 'Annually with 30% OFF' : 'Pay monthly';
            priceDesc.textContent = 'This plan is tailored for businesses with large-scale traffic. Please contact our support team for pricing and setup assistance.';
        } else {
            pricePeriod.style.display = 'inline';
            if (isAnnual) {
                priceAmount.textContent = '$' + plan.annualPrice;
                badgeBilling.textContent = 'Annually with 30% OFF';
                const totalAnnual = plan.annualPrice * 12;
                priceDesc.textContent = `An amount of $${totalAnnual} will be charged immediately and subsequently every 12 months. Additional taxes may apply based on your local tax regulations.`;
            } else {
                priceAmount.textContent = '$' + plan.monthlyPrice;
                badgeBilling.textContent = 'Pay monthly';
                priceDesc.textContent = `An amount of $${plan.monthlyPrice} will be charged immediately and subsequently every 30 days. Additional taxes may apply based on your local tax regulations.`;
            }
        }
    }

    visitsSlider.addEventListener('input', updatePricing);
    billingToggle.addEventListener('change', updatePricing);

    // Initial call to set the right styles and content
    calcAnnualPrice();
    updatePricing();
});
