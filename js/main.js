$('.marquee_header').marquee({
    duration: 25000,
    gap: 10,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true,
});

$('.marquee_home').marquee({
    duration: 25000,
    gap: 0,
    delayBeforeStart: 0,
    direction: 'left',
    duplicated: true,
});



MyApp = {
    header: {
        init: function () {
            window.addEventListener("scroll", function () {
                if (this.pageYOffset > 60) {
                    document.querySelector("header").classList.add("sticky");
                }
                else {
                    document.querySelector("header").classList.remove("sticky");
                }
            });
        }
    },
    lineaProductos: {
        init: function () {
            var listaLinea = document.querySelectorAll(".line_Productos .card .producto");

            for (let i = 0; i < listaLinea.length; i++) {
                if (i % 2 === 0) {
                    listaLinea[i].classList.add('left');
                } else {
                    listaLinea[i].classList.add('right');
                }
            }


            var content = document.querySelectorAll(".line_Productos .producto.left");
            for (let i = 0; i < content.length; i++) {
                var tl = gsap.timeline({
                    scrollTrigger: {
                        //markers: true,
                        trigger: content[i],
                        start: '-50% 60%',
                        end: '100% 100%',
                        scrub: 1,
                    },
                });
                tl.to(content[i], { xPercent: 91, duration: 10000, ease: "none" })
            }

            var content2 = document.querySelectorAll(".line_Productos .producto.right");
            for (let i = 0; i < content2.length; i++) {
                var tl = gsap.timeline({
                    scrollTrigger: {
                        //markers: true,
                        trigger: content2[i],
                        start: '-50% 60%',
                        end: '100% 100%',
                        scrub: 1,
                    },
                });
                tl.to(content2[i], { xPercent: -91, duration: 10000, ease: "none" })
            }
        }
    },
    changeImage: {
        init: function () {
            document.querySelector("section.beneficios ul li").classList.add("select");
            document.querySelector("section.beneficios .part2 img").classList.add("select");

            const elementos = document.querySelectorAll('section.beneficios ul li');
            const imgs = document.querySelectorAll('section.beneficios .part2 img');
            var ultimoElementoHover = null;

            elementos.forEach((elemento) => {
              elemento.addEventListener('mouseover', () => {
                if (ultimoElementoHover) {
                  ultimoElementoHover.classList.remove('select');
                }
                elemento.classList.add('select');
                ultimoElementoHover = elemento;

                var categoria = elemento.getAttribute('data-category')

                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].classList.remove('select');
                    if (categoria == imgs[i].getAttribute('data-category')) {
                        imgs[i].classList.add('select');
                    }
                }

              });
            });
        }
    },
    productosHome: {
        init: function () {
            document.querySelector("section.productosHome .datos ul li").classList.add("select");

            var swiper = new Swiper(".swiperProductosHome", {
                slidesPerView: 4.7,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                navigation: {
                    nextEl: ".productosHome .swiper-button-next",
                    prevEl: ".productosHome .swiper-button-prev",
                },
            })
            var swiper2 = new Swiper(".swiperProductosHome2", {
                slidesPerView: 4.7,
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                navigation: {
                    nextEl: ".productosHome .swiper-button-next",
                    prevEl: ".productosHome .swiper-button-prev",
                },
            })

            document.addEventListener("click", function (e) {
                if (e.target.closest("section.productosHome .swiperProductosHome .swiper-slide a .buttonAmarillo")) {
                    e.preventDefault();
                }
            })

            /******************************************** */
            let listaTitle = [];

            const enlaces = document.querySelectorAll('section.productosHome .datos ul li');
            var sliders = document.querySelectorAll('.productosHome .swiper');

            var cat = document.querySelector('section.productosHome .datos ul li.select').textContent;

            for (let i = 0; i < sliders.length; i++) {
                if (sliders[i].getAttribute("data-category") !== cat) {
                    sliders[i].style.display = "none";
                }
                
            }



            for (let i = 0; i < enlaces.length; i++) {
                textoitem = enlaces[i].textContent;
                listaTitle.push(textoitem);
            }

            enlaces.forEach((elemento) => {
                elemento.addEventListener('click', (evento) => {
                    enlaces.forEach((enlace) => enlace.classList.remove('select'));
                    evento.target.classList.add('select');
                    var categoria = evento.target.innerHTML;
                    $(`.productosHome .swiper`).not(`[data-category="${categoria}"]`).hide();
                    $(`.productosHome .swiper[data-category="${categoria}"]`).show();
                })
            })


        }
    }
}

if ($('.line_Productos').length > 0) {
    MyApp.lineaProductos.init();
}

if ($('header').length > 0) {
    MyApp.header.init();
}

if ($('.beneficios').length > 0) {
    MyApp.changeImage.init();
}

if ($('.productosHome').length > 0) {
    MyApp.productosHome.init();
}






