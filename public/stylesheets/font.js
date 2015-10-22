var addStylesheetWithRules = function(rules, id) {
    var $style = document.createElement('style');
    $style.innerHTML = rules;
    $style.id = id;

    // Append style element to head
    document.head.appendChild($style);
};

var loadFonts = function() {
    var pathPrefix = '/home/fonts/';
    var fontRegularPath = pathPrefix + 'NotoSansHans-Regular.otf';
    var fontRegularStyle = '@font-face { font-family : "Noto Sans Hans"; src : url("' + fontRegularPath + '"); } body { font-family: "Noto Sans Hans" !important; }';
    var fontThinPath = pathPrefix + 'NotoSansHans-Thin.otf';
    var fontThinStyle = '@font-face { font-family : "Noto Sans Hans Light"; src : url("' + fontThinPath + '"); }';

    if(localStorage.getItem('font_cached')) {
        addStylesheetWithRules(fontRegularStyle, 'fontRegular');
        addStylesheetWithRules(fontThinStyle, 'fontThin');
    } else {
        localStorage.setItem('font_cached', true);

        qwest.get(fontRegularPath, null, {
            cache : true
        }, function(xhr) {
            xhr.overrideMimeType('application/octet-stream');
        }).then(function() {
            console.log('font loaded', new Date().getTime());
            addStylesheetWithRules(fontRegularStyle, 'fontRegular');
        });

        qwest.get(fontThinPath, null, {
            cache : true
        }, function(xhr) {
            xhr.overrideMimeType('application/octet-stream');
        }).then(function() {
            addStylesheetWithRules(fontThinStyle, 'fontThin');
        });
    }
};

var isFontLoaded = function() {
    var str = '小龙虾多少钱一只？';

    var $t = document.createElement('div');
    $t.style = 'position: absolute; top: -9999px; left: -9999px; visibility: hidden; font-size: 250px';
    document.body.appendChild($t);

    var $i = document.createElement('span');
    $i.innerHTML = str;
    $t.appendChild($i);

    var hasLoaded = false;

    setTimeout(function checkFont() {
        var $j = document.createElement('span');
        $j.innerHTML = str;
        $j.style = 'font-family: "Noto Sans Hans" !important;';
        $t.appendChild($j);

        if($j.offsetWidth !== $i.offsetWidth) {
            hasLoaded = true;
            document.body.removeChild($t);
        } else {
            setTimeout(checkFont, 100);
        }
    }, 100);

    return function() {
        return hasLoaded;
    };
};

loadFonts();