$(function()
{
    var player = $('iframe#player'),
        playerUrl = "https://www.youtube.com/embed/%VIDEO%?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1";

    var vids = [],
        i = 0;

    var btns = $('.btn[data-engine]'),
        fails = 0;

    $.getJSON('videos.json', function(data)
    {
        vids = shuffle(data);

        if (i in vids)
            play(i);
        else
            finish("Euh. Y'a rien par ici ?!");
    });

    btns.click(function(e)
    {
        e.preventDefault();

        var btn = $(this),
            engine = vids[i].engine,
            engineAnswer = $(this).data('engine');

        if (engine == engineAnswer)
        {
            btns.removeClass('fail');

            i++;

            if (i in vids)
                play(i);
            else
                finish("C'était cool. Tu vas peut-être retourner travailler maintenant ?");
        }
        else
        {
            btn.addClass('fail');

            fails++;

            if (fails > 5)
            {
                finish("Tu fais tout au hasard en fait ?");
            }
        }
    });

    function play(i)
    {
        var src = playerUrl.replace('%VIDEO%', vids[i].video);

        if (vids[i].start)
        {
            src += '&start=' + vids[i].start;
        }

        if (vids[i].end)
        {
            src += '&end=' + vids[i].end;
        }

        player.attr('src', src);
    }

    function finish(msg)
    {
        player.replaceWith('<div class="jumbotron"><p class="lead">'+msg+'</p></div>');
    }

    function shuffle(array)
    {
        for (var i = array.length - 1; i > 0; i--)
        {
            var j = Math.floor(Math.random() * (i + 1));

            var tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }

        return array;
    }
});