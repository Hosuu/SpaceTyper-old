loadFont();

function showSettings()
{
    $('#settings').css("left", "0vw");
}

function hideSettings()
{
    $('#settings').css("left", "100vw");
}

function settingsDiff(value){
    config.game.difficulty+=value;
    if(config.game.difficulty== 4)
        config.game.difficulty = 0;
    else 
    if(config.game.difficulty== -1)
        config.game.difficulty= 3;

    $('#settings-diff').html(difficulty[config.game.difficulty].name);
}

$('#settings-font-name').change(function(){
    config.text.font = $('#settings-font-name').val()
    loadFont();
});

function settingsFontSize(value){
    config.text.size+=value;
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

function settingsColor(jscolor, propery) {
    switch(propery)
    {
        case 'starsColor': config.stars.color = `#${jscolor}`; reRenderStars(); break;
        case 'BgColor': config.game.backgroundColor =`#${jscolor}`; break;
        case 'textColor': config.text.color =`#${jscolor}`; break;
        case 'textHighlightColor': config.text.highlightColor =`#${jscolor}`; break;
    }
}

function reportBug()
{
    window.open("https://github.com/Hosuu/SpaceTyper/issues/new","_Blank")
}

function settingsDefault()
{
    config = {

        game: {
            difficulty: 0,
            backgroundColor: "#050505",
    
        },
    
        text: {
            font: "Comfortaa",
            size: 24,
            color: "#ccc",
            highlightColor: "#f00",
            bold: true,
            italic: true,
        },
    
        stars: {
            render: true,
            count: 120,
            minSize: 4,
            maxSize: 6,
            color: "#ccc",
            rainbow: false,
        }
    }

    seetingsReload();
}

function seetingsReload()
{
    SettingsChecksUpdate();
    settingsDiff(0);
    settingsFontSize(0);
    starsCount(0);
    $('#settings-font-name').val(config.text.font);
    document.getElementById('settings-background').jscolor.fromString(config.game.backgroundColor);
    document.getElementById('settings-font-color').jscolor.fromString(config.text.color);
    document.getElementById('settings-highlight').jscolor.fromString(config.text.highlightColor);
    document.getElementById('settings-star-color').jscolor.fromString(config.stars.color);
}

setTimeout(()=>{seetingsReload();},100)