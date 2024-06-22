/**
 *
 *  This file responsible for 
 *  1 - filter products by categories
 *
 */

var productCategories = document.getElementsByClassName('categoryList')[0].children

var products = document.getElementById('productsCategoriesList').children

function filter()
{
    for(var i = 0 ; i< productCategories.length ; i++)
        {
            if(productCategories[i].children[0].checked)
            {
                products[i].classList.remove('d-none')
            }else{
                products[i].classList.add('d-none')
            }
        }
}
