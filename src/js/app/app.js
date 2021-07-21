import { Forecast } from './components/forecast';

class WebApp {

    constructor($window, $document, _data) {

        this.$window = $window;
        this.$document = $document;
        this.data = (_data) ? _data : {};


        this.forecast = new Forecast();
    }

    init() {

        this.$document.ready( () => { this.afterDocumentreadyHook(); } );
        this.$window.on( 'load', () => { this.afterWindowloadHook(); } );

    }

    clearData() {

        this.data = {};
        return true;

    }

    afterDocumentreadyHook(){
        
        this.forecast.init();
    }

    afterWindowloadHook(){
        

    }

    bindScrollToAnchor() {

    }

    scrollToAnchor(target) {
        
    }

    scrollToAnchorById(target){
        
    }

}

const _WebApp = new WebApp( 
    $(window), 
    $(document), 
    { 
        started : Date.now() 
    }
).init();