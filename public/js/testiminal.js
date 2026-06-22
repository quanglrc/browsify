document.addEventListener('DOMContentLoaded', () => {
    const persons = document.querySelectorAll('.person-review');
    const track = document.getElementById('testimonialsTrack');
    const wrapper = document.querySelector('.testimonials-slider-wrapper');
    const cards = document.querySelectorAll('.testimonial-card');

    if (!track || persons.length === 0 || cards.length === 0) return;

    const cardWidth = 411; 
    const gap = 32;        

    function updateSlider(index) {
        persons.forEach(p => p.classList.remove('active'));
        if (persons[index]) {
            persons[index].classList.add('active');
        }

        cards.forEach(card => card.classList.remove('active'));
        if (cards[index]) {
            cards[index].classList.add('active');
        }

        const wrapperWidth = wrapper.clientWidth;
        const translateX = wrapperWidth / 2 - (index * (cardWidth + gap) + cardWidth / 2);

        track.style.transform = `translateX(${translateX}px)`;
    }

    persons.forEach((person) => {
        person.addEventListener('click', () => {
            const index = parseInt(person.getAttribute('data-index'), 10);
            updateSlider(index);
        });
    });

    updateSlider(2);

    window.addEventListener('resize', () => {
        const activePerson = document.querySelector('.person-review.active');
        if (activePerson) {
            const index = parseInt(activePerson.getAttribute('data-index'), 10);
            updateSlider(index);
        }
    });
});
