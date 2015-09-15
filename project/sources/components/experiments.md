    <div style="font-family: sans; width: 80%">
        <span contenteditable>This is a test</span>
        <span contenteditable id="area">of the emergency</span>
        <span contenteditable>system</span>
    </div>

    <script>

        var area = document.getElementById('area');

        var eventHandler = function (e) {
            setTimeout(function() {
                area.innerHTML = area.textContent;
            }, 10);
        };


        area.addEventListener('paste', eventHandler);
        area.addEventListener('keyup', eventHandler);

    </script>
