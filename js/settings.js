loadFont();

function showSettings()
{
    $('#settings').css("left", "0vw");
}

function hideSettings()
{
    $('#settings').css("left", "100vw");
}

function higherdiff(){
    config.game.difficulty++;
    if(config.game.difficulty== 4)
    config.game.difficulty = 0;
    $('#settings-diff').html(difficulty[config.game.difficulty].name);
}

function lowerdiff(){
    config.game.difficulty--;
    if(config.game.difficulty== -1)
    config.game.difficulty = 3;
    $('#settings-diff').html(difficulty[config.game.difficulty].name);
}

function biggerfont(){
    config.text.size++;
    $('#settings-font-size').html(`${config.text.size}px`);
}

function smallerfont(){
    config.text.size--;
    $('#settings-font-size').html(`${config.text.size}px`);
}

function SettingsChecksUpdate()
{
    if(config.text.bold)
        $('#settings-bold-style').html('<i class="fas fa-check"></i>');
    else
        $('#settings-bold-style').html('<i class="fas fa-times"></i>');

    if(config.text.italic)
        $('#settings-italic-style').html('<i class="fas fa-check"></i>');
    else
        $('#settings-italic-style').html('<i class="fas fa-times"></i>');

    if(config.stars.render)
        $('#settings-render-stars').html('<i class="fas fa-check"></i>');
    else
        $('#settings-render-stars').html('<i class="fas fa-times"></i>');

    if(config.stars.rainbow)
        $('#settings-rainbow-stars').html('<i class="fas fa-check"></i>');
    else
        $('#settings-rainbow-stars').html('<i class="fas fa-times"></i>');
}

function settingsTogle(propery)
{
    switch(propery)
    {
        case "boldStyle": config.text.bold = !config.text.bold; break;
        case "italicStyle": config.text.italic = !config.text.italic; break;
        case "renderStars": config.stars.render = !config.stars.render; break;
        case "rainbowStars": config.stars.rainbow = !config.stars.rainbow; break;
        
    }
    SettingsChecksUpdate();
}


function starsCount(value)
{
    config.stars.count+=value;
    $('#settings-stars-count').html(`${config.stars.count}`);
    reRenderStars();
}





function loadFont() 
{
    WebFont.load({
        google: {
            families: [config.text.font]
        }
    });
}

