$(document).ready(function() {
    $.widget("acme.randomColor", {
        options: {
            red: 0,
            green: 0,
            blue: 0
        },
        
        _create: function() {
            this.element.append(`<button class="random-color">Generate random color</button>`);
            this._on( ".board", {
                "click .random-color":  function(event) {
                    this.random(event);
                }

            });
        },

        _setOption: function(key, value) {
            this.options[key] = value;
            // this._update();
        },

        _update: function(event) {
            this.element.css( "background-color", "rgb(" +
            this.options.red +"," +
            this.options.green + "," +
            this.options.blue + ")"
            );
        },
            random: function(event) {
                var colors = {
                    red: Math.floor( Math.random() * 256 ),
                    green: Math.floor( Math.random() * 256 ),
                    blue: Math.floor( Math.random() * 256 )
                  };

                this.option( colors );
                this._update();
        },

        _destroy: function() {
            this.element
            .enableSelection()
            .css( "background-color", "transparent" );
            }
    });

    // Init the widget on our progress-element
    $(".board").randomColor();
    // Set the value using setOption
    

});