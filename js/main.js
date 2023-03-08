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

document.addEventListener("click", function (e) {
    if (e.target.closest("header .navigation ul li ul li a")) {
        var categoriaLink = e.target.textContent
        localStorage.setItem('CatNovedad1', `${categoriaLink}`);
    } else {
        localStorage.setItem('CatNovedad1', `none`);
    }
    if (e.target.closest(".checkbox-box .labelPoliticas")) {
        document.querySelector(".labelPoliticas").classList.toggle("activo");
    }
    if (e.target.closest(".checkbox-box .recordarPassword")) {
        document.querySelector(".recordarPassword").classList.toggle("activo");
    }
    if (e.target.closest(".navigation button.buscador") || e.target.closest("section.buscador .top")) {
        document.querySelector("section.buscador").classList.toggle("open");
    }
})


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
    },
    categorias: {
        init: function () {
            //document.querySelector("section.productosPage .menus ul li").classList.add("select");        
            const enlaces2 = document.querySelectorAll('section.productosPage .menus ul li');
            const enlaces3 = document.querySelectorAll('section.productosPage .menus .submenuCategory');
            const enlaces4 = document.querySelectorAll('section.productosPage .menus .submenuCategory button');
            var categoriaClicK = localStorage.getItem("CatNovedad1");

            if (categoriaClicK == "none") {
                document.querySelector("section.productosPage .menus ul li").classList.add("select");
            }

            let listaTitle = [];

            for (let i = 0; i < enlaces2.length; i++) {
                textoitem = enlaces2[i].textContent;
                listaTitle.push(textoitem);
            }

            if (listaTitle.includes(categoriaClicK)) {
                for (let y = 0; y < enlaces2.length; y++) {
                    if (categoriaClicK === enlaces2[y].textContent) {
                        document.querySelector("section.productosPage .menus ul li").classList.remove("select");
                        enlaces2[y].classList.add('select')
                    }
                }
            }


            $('.itemProducto').hide();

            var categoryMain = document.querySelector('section.productosPage .menus ul li.select').textContent;

            if (categoryMain === "Todos") {
                $(`.itemProducto`).show(0);
            } else {
                $(`.itemProducto[data-category="${categoryMain}"]`).show();
                var cat1 = document.querySelector('section.productosPage .menus ul li.select').getAttribute("data-category");
                for (let i = 0; i < enlaces3.length; i++) {
                    if (enlaces3[i].getAttribute("data-category") == cat1) {
                        $(`.submenuCategory[data-category="${cat1}"]`).show();
                        $(`.submenuCategory`).not(`[data-category="${cat1}"]`).hide();
                    }

                }
            }

            enlaces2.forEach((elemento) => {
                elemento.addEventListener('click', (evento) => {
                    enlaces2.forEach((enlace2) => enlace2.classList.remove('select'));
                    evento.target.classList.add('select');
                    var categoria = evento.target.textContent;
                    $(`.itemProducto`).not(`[data-category="${categoria}"]`).hide();
                    $(`.itemProducto[data-category="${categoria}"]`).show();
                    if (categoria === "Todos") {
                        $(`.itemProducto`).show();
                        $(`.submenuCategory`).hide();
                    }

                    var categoria2 = evento.target.getAttribute("data-category");
                    console.log(categoria2);

                    for (let i = 0; i < enlaces3.length; i++) {
                        if (enlaces3[i].getAttribute("data-category") == categoria2) {
                            $(`.submenuCategory[data-category="${categoria2}"]`).show();
                            $(`.submenuCategory`).not(`[data-category="${categoria2}"]`).hide();
                        }
                    }
                    for (let i = 0; i < enlaces4.length; i++) {
                        enlaces4[i].classList.remove("select")
                    }
                })
            })

            enlaces4.forEach((elemento) => {
                elemento.addEventListener('click', (evento) => {
                    enlaces4.forEach((enlaces4) => enlaces4.classList.remove('select'));
                    evento.target.classList.add('select');
                    var categoria4 = evento.target.textContent;
                    $(`.itemProducto`).not(`[data-subcategory="${categoria4}"]`).hide();
                    $(`.itemProducto[data-subcategory="${categoria4}"]`).show();
                })
            })
        }
    },
    tabs: {
        init: function () {
            document.querySelector("section.producto .tabs ul li").classList.add("select");
            const enlacesProducto = document.querySelectorAll('section.producto .tabs ul li');
            const parrafoProducto = document.querySelectorAll('section.producto .tabs .descripcion p');

            var texto = ''
            for (let i = 0; i < enlacesProducto.length; i++) {
                if (enlacesProducto[i].classList.contains("select")) {
                    texto = enlacesProducto[i].textContent
                    $(`.tabs .descripcion p`).not(`[data-category="${texto}"]`).hide();
                    $(`.tabs .descripcion p[data-category="${texto}"]`).show();
                }
            }

            enlacesProducto.forEach((elemento) => {
                elemento.addEventListener('click', (evento) => {
                    enlacesProducto.forEach((enlacesProducto) => enlacesProducto.classList.remove('select'));
                    evento.target.classList.add('select');
                    var categoria = evento.target.textContent;
                    $(`.tabs .descripcion p`).not(`[data-category="${categoria}"]`).hide();
                    $(`.tabs .descripcion p[data-category="${categoria}"]`).show();
                })
            })
        }
    },
    relacionados: {
        init: function () {
            var swiper3 = new Swiper(".productosRelacionados", {
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: ".relacionados .swiper-button-next",
                    prevEl: ".relacionados .swiper-button-prev",
                },
            })
        }
    },
    tabs2: {
        init: function () {
            document.querySelector("section.bannerInterna .part1 ul li").classList.add("select");
            const enlacesProducto2 = document.querySelectorAll('section.bannerInterna .part1 ul li');

            var texto = ''
            for (let i = 0; i < enlacesProducto2.length; i++) {
                if (enlacesProducto2[i].classList.contains("select")) {
                    texto = enlacesProducto2[i].textContent
                    $(`section.bannerInterna .part2 .container .contentInfo`).not(`[data-category="${texto}"]`).hide();
                    $(`section.bannerInterna .part2 .container .contentInfo[data-category="${texto}"]`).show();
                }
            }

            enlacesProducto2.forEach((elemento) => {
                elemento.addEventListener('click', (evento) => {
                    enlacesProducto2.forEach((enlacesProducto2) => enlacesProducto2.classList.remove('select'));
                    evento.target.classList.add('select');
                    var categoria = evento.target.textContent;
                    $(`section.bannerInterna .part2 .container .contentInfo`).not(`[data-category="${categoria}"]`).hide();
                    $(`section.bannerInterna .part2 .container .contentInfo[data-category="${categoria}"]`).show();
                })
            })
        }
    },
    acordeon: {
        init: function () {
            let collapsible = document.querySelectorAll(".faq-collapsible");
            collapsible.forEach((element) => {
                element.addEventListener("click", (element) => {
                    if (!element.target.parentElement.classList.contains('open')) {
                        for (let i = 0; i < collapsible.length; i++) {
                            collapsible[i].parentElement.classList.remove("open");
                        }
                        element.target.parentElement.classList.add("open");
                    } else {
                        element.target.parentElement.classList.remove("open");
                    }

                    const elements = document.querySelectorAll(".oculto");
                    addClassToVisibleElements(elements, "visible");
                });
            });
        }
    },
    validate: {
        init: function () {
          var formespacio = document.querySelectorAll(".form-group");    
          var formespacioinput = document.querySelectorAll(".form-input.required");    
          var formespacioinput2 = document.querySelectorAll(".form-input");    
          var formespacioselect = document.querySelectorAll("form select");    
          var formespacioselect = document.querySelectorAll(
            ".formulario select.form-input"
          );
    
          $(document).on("wheel", "input[type=number]", function (e) {
            $(this).blur();
          });
    
          function inputcheck() {
            for (let i = 0; i < formespacioinput2.length; i++) {
              if (!formespacioinput2[i].value) {
                formespacioinput2[i].parentElement.parentElement.classList.remove(
                  "ok"
                );
              } else {
                formespacioinput2[i].parentElement.parentElement.classList.add(
                  "ok"
                );
              }
            }
          }
    
          function validateInput(e) {
            for (let y = 0; y < formespacioinput.length; y++) {
              if (!formespacioinput[y].value) {
                formespacioinput[y].parentElement.parentElement.classList.add(
                  "error"
                );    
                e.preventDefault();
              } else {
                formespacioinput[y].parentElement.parentElement.classList.remove(
                  "error"
                );
              }
            }
          }
    
          function validateSelect(e) {
            for (let i = 0; i < formespacioselect.length; i++) {
              if (formespacioselect[i].classList.contains("default")) {
              } else {
                if (formespacioselect[i].value == "") {
                  formespacioselect[i].classList.add("falta");    
                  e.preventDefault();
                } else {
                  formespacioselect[i].classList.remove("falta");
                }
              }
            }
          }
    
          function validatecheckbox(e) {
            if (document.querySelector('input[name="motivo"]:checked')) {
              if (!document.querySelector('input[name="motivo"]:checked')) {
                document
                  .querySelector(".texto-check-motivo")
                  .classList.add("error");    
                // e.preventDefault();
              } else {
                document
                  .querySelector(".texto-check-motivo")
                  .classList.remove("error");
              }
            }
          }
    
          $(".form-input").on("change", () => {
            formespacioinput.forEach((element) => {
              if (!element.value == "") {
                element.parentElement.parentElement.classList.add("ok");
              } else {
                element.parentElement.parentElement.classList.remove("ok");
              }
            });
          });
    
          function validateCheck(e) {
            formespaciocheck = document.querySelectorAll(
              ".formulario input.required[type='checkbox']"
            );
    
            for (let i = 0; i < formespaciocheck.length; i++) {
              if (formespaciocheck[i].checked) {
                formespaciocheck[i].parentElement.parentElement.classList.remove(
                  "error"
                );
              } else {
                formespaciocheck[i].parentElement.parentElement.classList.add(
                  "error"
                );
              }
            }
          }
    
          document.addEventListener("click", function (e) {
            if (e.target.closest(".form-input")) {
              formespacio.forEach(function (shinyItem) {
                shinyItem.classList.remove("focusin");
              });
    
              e.target.parentElement.parentElement.classList.add("focusin");
            } else {
              formespacio.forEach(function (shinyItem) {
                shinyItem.classList.remove("focusin");
              });
            }
    
            inputcheck();
    
            if (e.target.closest("form button")) {
              validateInput(e);
    
              validateSelect(e);
    
              validatecheckbox(e);
    
              validateCheck(e);
            }
          });
    
          document.addEventListener("keydown", function (event) {
            if (event.keyCode == 9) {
              for (let i = 0; i < formespacioinput2.length; i++) {
                formespacioinput2[i].addEventListener("focusin", (event) => {
                  formespacioinput2[i].parentElement.parentElement.classList.add(
                    "focusin"
                  );
                });
    
                formespacioinput2[i].addEventListener("focusout", (event) => {
                  formespacioinput2[i].parentElement.parentElement.classList.remove(
                    "focusin"
                  );
    
                  if (formespacioinput2[i].value) {
                    formespacioinput2[i].parentElement.parentElement.classList.add(
                      "ok"
                    );
                  }
                });
              }
            }
          });
        },
      },
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

if ($('.productosPage .menus').length > 0) {
    MyApp.categorias.init();
}

if ($('section.producto .part2 .tabs').length > 0) {
    MyApp.tabs.init();
}

if ($('section.relacionados').length > 0) {
    MyApp.relacionados.init();
}

if ($('section.bannerInterna ul li').length > 0) {
    MyApp.tabs2.init();
}

if ($('.faq-content').length > 0) {
    MyApp.acordeon.init();
}

if ($('.formulario').length > 0) {
    MyApp.validate.init();
}







