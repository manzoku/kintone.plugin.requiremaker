jQuery.noConflict();

(function(pluginId, $) {
	"use strict";

	$(function() {
		var config = kintone.plugin.app.getConfig(pluginId);
		var spectrumOption = {
			showInput: true,
			showPalette: true,
			preferredFormat: "hex3",
			chooseText: "選択",
			cancelText: "キャンセル",
			color: '#e74c3c',
			palette: [
				['#e74c3c']
			]
		};
		if (config['text']) {
			$('#kintone-plugin-requiremaker-text').val(config['text']);
		}
		if (config['size']) {
			$('#kintone-plugin-requiremaker-size').val(config['size']);
		}
		if (config['color']) {
			spectrumOption.color = config['color'];
			spectrumOption.palette[0][0] === config['color'] ? void(0): spectrumOption.palette[0].push(config['color']);
		}
		$('#kintone-plugin-requiremaker-color').spectrum(spectrumOption);
		if (config['weight']) {
			$('#kintone-plugin-requiremaker-weight option').prop('selected', false).filter('[value=' + config['weight'] + ']').prop('selected', true);
		}
		if (config['style']) {
			$('#kintone-plugin-requiremaker-style option').prop('selected', false).filter('[value=' + config['style'] + ']').prop('selected', true);
		}

		kintone.api(kintone.api.url('/k/v1/form', true), 'GET', {
			'app': kintone.app.getId()
		}, function(resp) {
			$.each(resp['properties'], function(index, property) {
				if (property['type'] === 'RECORD_NUMBER' || property['type'] === 'MODIFIER' || property['type'] === 'CREATOR' || property['type'] === 'UPDATED_TIME' || property['type'] === 'CREATED_TIME') {
					var code = '';
					if (property['type'] === 'RECORD_NUMBER') {
						code = 'record_id';
					} else if (property['type'] === 'MODIFIER') {
						code = 'modifier';
					} else if (property['type'] === 'CREATOR') {
						code = 'creator';
					} else if (property['type'] === 'UPDATED_TIME') {
						code = 'modified_at';
					} else {
						code = 'created_at';
					}
					$('#row' + code + '+label').html(property['label']).parents('.kintoneplugin-input-checkbox').show();
				}
			});
			if (config['disables']) {
				var disables = JSON.parse(config['disables']);
				for(var key in disables) {
					$('#row' + key).prop('checked', true);
				}
			}
		});

		$('#setting-submit').click(function() {
			var config = {};
			config['text'] = $('#kintone-plugin-requiremaker-text').val();
			config['size'] = $('#kintone-plugin-requiremaker-size').val();
			config['color'] = $('#kintone-plugin-requiremaker-color').spectrum('get').toHexString();
			config['weight'] = $('#kintone-plugin-requiremaker-weight option:selected').val();
			config['style'] = $('#kintone-plugin-requiremaker-style option:selected').val();
			var disables = {};
			$('#kintone-plugin-requiremaker-disables input:checked').each(function() {
				disables[$(this).val()] = true;
			});
			config['disables'] = JSON.stringify(disables);
			kintone.plugin.app.setConfig(config);
		});
		$('#setting-cancel').on('click', function() {
			history.back();
		});
	});
})(kintone.$PLUGIN_ID, jQuery);
