function productSection(settings) {
    const {section, btn} = settings,
        sectionHTML = document.querySelector(section),
        btnHTML = document.querySelector(btn);

    let result = null,
        pageNumber = 2;

    btnHTML.addEventListener('click', productBtnClick);
    
    function productBtnClick() {

        if(result !== null) {
            appendProduct(result, newRequest);
            result = null;
        }
    };

    function appendProduct(resp, callbeck) {

        for (let i = 0, len = result.entities.length; i < len; i++) {

            (function (i) {
                setTimeout(function () {
                    sectionHTML.insertAdjacentElement("beforeend", template.call(resp.entities[i]))

                    if (resp.total === document.querySelector(section).children.length) {
                        let parent = btnHTML.parentElement;
                        parent.removeChild(btnHTML);
                        return;
                    };
                }, i * 100)
            })(i);
        }


        callbeck();
    }

    newRequest();

    function response (data) {
        var obj;
        try {
            obj = JSON.parse(data)
        }
        catch(e){
            console.log(e)
        }

        result = obj;
        pageNumber++;
    };

    function newRequest() {
        xhrRequest(pageNumber, response);
    }
}

function template(date) {
    let HtmlElem = document.createElement('div'),
        value = `<div class="product-holder">
                    <div class="product-image">
                        <img src="${this.img}" alt="${this.title}">
                        ${this.new ? `<span class="product-status product-new">new</span>`: ''}
                        ${this.discountCost !== null ? `<span class="product-status product-sale">${this.discountCost}</span>`: ''}
                    </div>
                    <h2>${this.title}</h2>
                    <p>${this.description}</p>
                    <div class="product-price">
                        <span class="product-price__cost">&#36; ${this.cost}</span>
                        ${this.discountCost !== null ? `<span class="product-price__discount"> &#36; ${this.discountCost}</span>`: ''}
                    </div>
                    <div class="product-btn">
                        <form>
                            <button type="submit" class="btn btn-secondary btn-secondary-outline">add to cart</button>
                        </form>
                        <a href="#" class="btn btn-primary">view</a>
                    </div>
                </div>`;
    HtmlElem.setAttribute('class', 'grid-col grid-col-xlg-4 grid-col-lg-3 grid-col-md-2 product-show');
    HtmlElem.innerHTML = value;
    return HtmlElem;
}
