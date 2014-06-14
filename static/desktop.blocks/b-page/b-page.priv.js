module.exports = function (blocks) {
    blocks.declare('b-page', function (data, page) {

        // BEM.I18N.lang(data.language);

        return [
            {
                block: 'b-page',
                title: 'Twi',
                js: true,
                head: [
                    { elem: 'css', url: data.stHost + '/desktop.bundles/' + page + '/_' + page + '.css', ie: false },
                    { elem: 'css', url: data.stHost + '/desktop.bundles/' + page + '/_' + page, ie: true },
                    { elem: 'js', url: '//yastatic.net/jquery/1.8.3/jquery.min.js' },
                    { elem: 'js', url: data.stHost + '/desktop.bundles/' + page + '/_' + page + '.' + data.language + '.js' },
                    // Это необходимо подключать только тогда, когда у вас используются лайки со счётчиками
                    // { elem: 'js', url: '//yastatic.net/share/cnt.share.js' },

                    // FIXME: незабываем заменить favicon на иконку своего сервиса
                    // { elem: 'favicon', url: '//yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico' },

                    // FIXME: Меты для поисковой оптимизации
                    { elem: 'meta', attrs: { name: 'description', content: '' } },
                    { elem: 'meta', attrs: { name: 'keywords', content: '' } },

                    // FIXME: Меты OpenGraph протокола http://developers.facebook.com/docs/opengraph/
                    { elem: 'meta', attrs: { property: 'og:title', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:description', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:image', content: '' } },
                    { elem: 'meta', attrs: { property: 'og:type', content: 'website' } }
                ],

                // Это приводит IE в режим совместимости с IE7, если оно не нужно -- удаляйте строку
                'x-ua-compatible': 'IE=EmulateIE7, IE=edge',

                content: [
                    'test'
                ]
            }
        ];
    });
};