function zoomImagem() {
    $(document).ready(function () {
        $('#ordem-servico').click(function () {
            if ($(window).width() < 768) {
                window.open('/assets/img/OS.png', '_blank');
            }
        });
    });
}

function controlaPopover() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [];

    popoverTriggerList.forEach((popoverTriggerEl) => {
        const popover = new bootstrap.Popover(popoverTriggerEl);
        popoverList.push(popover);

        popoverTriggerEl.addEventListener('click', function () {
            const isOpen = popover._element.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                popover.hide();
            } else {
                popoverList.forEach((otherPopover) => {
                    if (otherPopover !== popover) {
                        otherPopover.hide();
                    }
                });
                popover.show();
            }
        });
    });
}

function criaLinha() {
    $(document).ready(function () {
        var linhaAberta = null;

        $('#vertical, #horizontal, #ponte, #diagonal').click(function () {
            var linhaClass = '.' + $(this).attr('id') + '-linha';

            if (linhaAberta !== linhaClass) {
                if (linhaAberta !== null) {
                    $(linhaAberta).hide();
                }
                linhaAberta = linhaClass;
                $(linhaAberta).show();
            } else {
                $(linhaAberta).hide();
                linhaAberta = null;
            }
        });
    });
}

function correcao() {
    $(document).ready(function () {
        var respostasCorretas = {
            'valor-horizontal': '54',
            'valor-ponte': '20',
            'valor-vertical': '40',
            'valor-diagonal': '54',
            'valor-esferico-direito': '-3,00',
            'valor-cilindrico-direito': '-0,50',
            'valor-eixo-direito': '25',
            'valor-refracao': '1.59',
            'valor-adicao-direito':'+2,00',
            'valor-dnp-direito': '34'
        };

        $('.input').click(function () {
            var input = $(this);
            var id = input.attr('id');
            var originalValue = input.val();

            input.replaceWith($('<input type="text" class="form-control">')
                .attr('id', id)
                .val(originalValue)
            );
        });

        $('#resultado-oculos').click(function () {
            var respostasIncorretas = [];

            for (var id in respostasCorretas) {
                var respostaCorreta = respostasCorretas[id];
                var respostaUsuario = $('#' + id).val();

                if (respostaUsuario !== '') {
                    if (respostaUsuario.trim() !== respostaCorreta.trim()) {
                        respostasIncorretas.push(id);
                    }
                } else {
                    if (respostaCorreta !== '' && respostaCorreta !== '0') {
                        respostasIncorretas.push(id);
                    }
                }
            }

            if (respostasIncorretas.length > 0) {
                $('#modal-errou-resultado').modal('show');
                $('#audio-incorreto')[0].play();
            } else {
                $('#modal-acertou-resultado').modal('show');
                $('#audio-correto')[0].play();
            }
        });
    });
}

zoomImagem();
controlaPopover();
criaLinha();
correcao();