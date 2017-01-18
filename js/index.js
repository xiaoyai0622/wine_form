/**
 * Created by xiaoY on 18/1/17.
 */
$(document).ready(function () {
    /*
     *  hide the company field after check residential radio
     *
     */

    if(readCookie('form_saved')==='true'){

        if (readCookie('submitted')==='true'){

            displayDataFromCookie(readCookie('form_data'));
        }else{

            retriveDataFromCookie(readCookie('form_data'))
        }

    }

    $('#commercial').click(function () {
        if ($('#commercial').is(':checked')) {
            console.log('the address is ' + this.value);
            $('#shipping-company').css('display', 'block');
        }
    });
    $('#residential').click(function () {
        if ($('#residential').is(':checked')) {
            console.log('the address is ' + this.value);
            $('#shipping-company').css('display', 'none');
        }
    });

    /*  log and check all the value on blur */
    $("input").blur(function () {
            var parse = '';
            console.log(this.id + " has finished edit, the value is " + this.value);
            createCookie(this.id,this.value,7)
            createCookie('form_saved',true,7)
            if (this.id == 'phone') {
                parse = this.value.match(/[^0-9]+/g);
                if (parse) {
                    $('#alert-phone').css('display', 'block');
                } else {
                    $('#alert-phone').css('display', 'none');
                }
            } else if (this.id == 'zip') {
                parse = this.value.match(/[^0-9]+/g);

                if (parse) {
                    $('#alert-zip').css('display', 'block');
                } else {
                    $('#alert-zip').css('display', 'none');
                }
            }

        }
    )

    /*
     *  check the valid state choose
     *
     */

    $('#state-select').change(function () {

        switch (this.value){
            case 'NY':
                $('#alert-state-disable').css('display', 'block');
                $('#wine-form-submit').css('display', 'none');
                break;
            case 'CA':
                $('#alert-state-disable').css('display', 'block');
                $('#wine-form-submit').css('display', 'none');
                break;
            case 'MA':
                $('#alert-state-disable').css('display', 'block');
                $('#wine-form-submit').css('display', 'none');
                break;
            default:
                $('#alert-state-disable').css('display', 'none');
                $('#wine-form-submit').css('display', 'inline-block');
        }
        console.log(this.value);
    })

    /*
     *  actions after form submitted
     *
     */

    $("#wine-form").submit(function (event) {
        if (validate()) {
            alert("Handler for .submit() called.");
            saveFormInCookie();
        }

        event.preventDefault();
    });

    /*
     *  actions for validate the form
     *  if not valid return false
     */

    function validate() {



        var email = document.getElementById('email-address').value;
        var email_comfirm = document.getElementById('email-address-confirm').value;
        var phone_number = document.getElementById('phone').value;
        var first_name = document.getElementById('first-name').value;
        var last_name = document.getElementById('last-name').value;
        var address_1 = document.getElementById('address-1').value;
        var city = document.getElementById('city').value;
        var zip = document.getElementById('zip').value;
        var phone = document.getElementById('phone').value;

        if(!(email&&email_comfirm&&phone_number&&first_name&&last_name&&address_1&&city&&zip&&phone)){
            alert('please enter the missing field.');
            return false;
        }

        var is_email_valid = email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

        if(!is_email_valid){
            $('#alert-email-validate').css('display', 'block');
            return false
        }else{
            $('#alert-email-validate').css('display', 'none');
        }


        if (email != email_comfirm) {

            $('#alert-email').css('display', 'block');
            return false
        } else {
            $('#alert-email').css('display', 'none');
        }

        var is_phone_valid = phone_number.match(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/);
        var is_phone_special = phone_number.match(/^\d{3}$/);
        console.log(is_phone_special);
        console.log(is_phone_valid);
        if(is_phone_valid||is_phone_special){
            $('#alert-phone').css('display', 'none');
        }else{

            $('#alert-phone').css('display', 'block');
            return false
        }
        console.log('Yes!');
        return true

    }

    function saveFormInCookie() {
        var email = document.getElementById('email-address').value;
        var email_comfirm = document.getElementById('email-address-confirm').value;
        var first_name = document.getElementById('first-name').value;
        var last_name = document.getElementById('last-name').value;
        var address_1 = document.getElementById('address-1').value;
        var address_2 = document.getElementById('address-2').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state-select').value;
        var zip = document.getElementById('zip').value;
        var phone = document.getElementById('phone').value;
        var residential = document.getElementById('residential').checked;
        var company = document.getElementById('company').value;
        var form_data = [];
        form_data.push(email);
        form_data.push(first_name);
        form_data.push(last_name);
        form_data.push(address_1);
        form_data.push(address_2);
        form_data.push(city);
        form_data.push(state);
        form_data.push(zip);
        form_data.push(phone);
        form_data.push(residential);
        form_data.push(company);

        createCookie('form_data',form_data,7);

        createCookie('form_saved',true,7);
        createCookie('submitted',true,7);
    }

    function displayDataFromCookie(data_string){
        var form_data = data_string.split(',');
        console.log(form_data);
        $('#part-email').html(form_data[0]);
        $('#part-email-confirm').html(form_data[0]);
        $('#part-first-name').html(form_data[1]);
        $('#part-last-name').html(form_data[2]);
        $('#part-address-1').html(form_data[3]);
        $('#part-address-2').html(form_data[4]);
        $('#part-city').html(form_data[5]);
        $('#part-state').html(form_data[6]);
        $('#part-zip').html(form_data[7]);
        $('#part-phone').html(form_data[8]);
        $('#part-shipping').html(form_data[9]);
        $('#part-company').html(form_data[10]);
    }

    function retriveDataFromCookie(data_string){
        var form_data = data_string.split(',');
        console.log(form_data);
        console.log(form_data);
        document.getElementById('email-address').value = readCookie('email-address');
        document.getElementById('email-address-confirm').value= readCookie('email-address-confirm');
        document.getElementById('first-name').value = readCookie('first-name');
        document.getElementById('last-name').value = readCookie('last-name');
        document.getElementById('address-1').value = readCookie('address-1');
        document.getElementById('address-2').value = readCookie('address-2');
        document.getElementById('city').value  = readCookie('city');
        document.getElementById('state-select').value = readCookie('state-select');
        document.getElementById('zip').value = readCookie('zip');
        document.getElementById('phone').value = readCookie('phone');
        document.getElementById('residential').checked = readCookie('residential');
        document.getElementById('company').value = readCookie('company');
    }

    function createCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }


    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
});

