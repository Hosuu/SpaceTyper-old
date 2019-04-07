loadFont();

function showSettings()
{
    $('#settings').css("left", "0vw");
}

function hideSettings()
{
    $('#settings').css("left", "100vw");
}


function loadFont() 
{
    WebFont.load({
        google: {
            families: [config.text.font]
        }
    });
}