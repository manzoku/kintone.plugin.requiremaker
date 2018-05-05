jQuery.noConflict();

(function(pluginId, $) {
    "use strict";

    kintone.events.on(['app.record.create.show', 'app.record.edit.show'], function(evt) {
        var config = kintone.plugin.app.getConfig(pluginId);
        if (config['size'] && config['color'] && config['weight'] && config['style']) {
            $('.require-cybozu').css({
                fontSize: config['size'] + 'px',
                color: config['color'],
                fontWeight: config['weight'],
                fontStyle: config['style']
            });
        }
        if (config['text']) {
            $('.require-cybozu').html(config['text']);
        }
        if (config['disables']) {
            var disables = JSON.parse(config['disables']);
            for(var key in disables) {
                $('.control-' + key + '-field-gaia .require-cybozu').hide();
            }
        }
        return evt;
    });
})(kintone.$PLUGIN_ID, jQuery);
