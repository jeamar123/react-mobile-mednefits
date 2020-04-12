/*
* @author detatsatrio
* @year 2018
*/
import base64 from 'react-native-base64'
import { MAIN, WEB, NEW_MAIN } from './environment'

// ----------------------------------------------------------------------------------------------------------------------------------------
// NEW VARIABLE API Node.js
export let BASE_URL                       = NEW_MAIN + '/api'

/** NEW AUTHENTICATION VARIABLE */
export let U_NAME                         = "mednefits"
export let U_PASS                         = "vH<tV@@E7w.X3cZS"
export let BASIC_AUTH                     = base64.encode(U_NAME + ":" + U_PASS)

export let NEW_AUTH                       = BASE_URL + '/auth';
export let NEW_AUTH_LOGIN                 = NEW_AUTH + '/login';

/** USER VARIABLE */
export let NEW_USER                       = BASE_URL + '/users';
export let NEW_ECARD                      = NEW_USER + '/ecard';
export let NEW_CREDIT                     = NEW_USER + '/credit';


/* LOCAL VARIABLE */
export let NEW_ACCESS_TOKEN               = "token"

// ----------------------------------------------------------------------------------------------------------------------------------------

export let CLIENT_SECRET                  = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';
export let CLIENT_ID                      = 'cfcd208495d565ef66e7dff9f98764da';
export let CURRENCY_LIST                  = MAIN + '/get/currency_lists';
export let CANCEL_VISIT_BYCLINIC          = MAIN + '/get/check_in_data';

/** AUTHENTICATION VARIABLE */
export let AUTH                           = MAIN + '/auth';
export let AUTH_LOGIN                     = AUTH + '/login';
export let AUTH_NEWLOGIN                  = AUTH + '/new_login';
export let AUTH_USER_PROFILE              = AUTH + '/userprofile';
export let AUTH_CARD_DETAILS              = AUTH + '/e_card_details';
export let AUTH_NEW_HISTORY               = AUTH + '/newhistory';
export let AUTH_NEW_ALLERGY               = AUTH + '/newallergy';
export let AUTH_NEW_CONDITION             = AUTH + '/newcondition';
export let AUTH_NEW_MEDICATION            = AUTH + '/newmedication';
export let AUTH_DELETE_ALLERGY            = AUTH + '/deleteallergy';
export let AUTH_DELETE_CONDITION          = AUTH + '/deletecondition';
export let AUTH_DELETE_MEDICATION         = AUTH + '/deletemedication';
export let AUTH_DELETE_HISTORY            = AUTH + '/deletehistory';
export let AUTH_UPDATE                    = AUTH + '/update';
export let AUTH_CHANGE_PASSWORD           = AUTH + '/change-password';
export let AUTH_RESET_PASSWORD            = AUTH + '/forgotpassword';
export let ONE_TAP_LOGIN                  = AUTH + '/one_tap/login';

/** CLINIC VARIABLE */
export let CLINIC                         = MAIN + '/clinic';
export let CLINIC_SEARCH                  = CLINIC + '/search';
export let CLINIC_CLINIC_DETAILS          = CLINIC + '/clinicdetails';
export let CLINIC_NEW_NEARBY              = CLINIC + '/new_nearby';
export let CLINIC_PROCEDURE_DETAILS       = CLINIC + '/procedure_details';
export let CLINIC_DOCTOR_PROCEDURE        = CLINIC + '/doctor_procedure';
export let CLINIC_CLINIC_TYPE             = CLINIC + '/clinic_type?type=with_dbs';
export let CLINIC_DETAILS                 = CLINIC + '/details';
export let CLINIC_NEARBY                  = CLINIC + '/nearby';
export let CLINIC_MAIN_SEARCH             = CLINIC + '/main_search';
export let CLINIC_SET_FAVOURITE           = CLINIC + '/favourite';
export let CLINIC_GET_FAVOURITE           = CLINIC + '/get_favourite_clinics';
export let CLINIC_SEND_PAYMENT            = CLINIC + '/send_payment';
export let CLINIC_PAYMENT_DIRECT          = CLINIC + '/payment_direct';
export let CLINIC_PAGE_NEARBY             = CLINIC + '/paginate_nearby';
export let CLINIC_ALL_NEARBY              = CLINIC + '/all_nearby';
export let CLINIC_CREATE_PAYMENT          = CLINIC + '/create_payment';
export let CANCEL_VISIT                   = CLINIC + '/cancel_visit';

/* USER VARIABLE */
export let USER                           = MAIN+"/user"
export let USER_CREDITS                   = USER+"/credits"
export let USER_COVERAGE_DATES = USER + "/get_dates_coverage"
export let USER_NETWORK_TRANSACTION       = USER+"/in_network_transactions"
export let USER_SPECIFIC_IN_NETWORK       = USER+"/specific_in_network"
export let USER_ECLAIM_TRANSACTION        = USER+"/e_claim_transactions"
export let USER_SPECIFIC_E_CLAIM          = USER+"/specific_e_claim_transaction"
export let USER_CREATE_E_CLAIM            = USER+"/create_e_claim"
export let USER_CHECK_E_CLAIM             = USER+"/check_e_claim_visit"
export let USER_HEALT_TYPE_LIST           = USER+"/health_type_lists"
export let USER_UPLOAD_IN_NETWORK_RECEIPT = USER+"/upload_in_network_receipt"
export let USER_SAVE_OUT_NETWORK_RECEIPT  = USER+"/save_out_of_network_receipt"
export let USER_UPLOAD_RECEIPT_BULK       = USER + "/upload_in_network_receipt_bulk"
export let USER_MEMBERLIST                = USER+"/member_lists"
export let FAMILY_COVERAGE                = USER+"/family_coverage_user_lists"
export let UPDATE_NOTIF                   = USER + "/update_notif_status"

/* LOCAL VARIABLE */
export let ACCESS_TOKEN                   = "access_token"
export let LATITUDE                       = 'latitude'
export let LONGITUDE                      = 'longitude'
export let CHECKIDVISIT                   = "check_in_id"

/* CLINIC */
export let CLINIC_TYPE                    = [
    {
        "ClinicTypeID": 12,
        "Name": "Screening",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651701/services_v1/Screening_touad3.png"
    },
    {
        "ClinicTypeID": 1,
        "Name": "GP",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651702/services_v1/General_Practice_e3gpfb.png"
    },
    {
        "ClinicTypeID": 2,
        "Name": "Dental",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651702/services_v1/Dental_mo24n1.png"
    },
    {
        "ClinicTypeID": 3,
        "Name": "TCM",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651702/services_v1/TCM_vmms0h.png"
    },
    {
        "ClinicTypeID": 13,
        "Name": "Wellness",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651702/services_v1/Wellness_fheexi.png"
    },
    {
        "ClinicTypeID": 14,
        "Name": "Specialist",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564651700/services_v1/Specialist_z6itzq.png"
    },
    {
        "ClinicTypeID": "01",
        "Name": "Protection Hub",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1565330121/services_v1/Frame-6_zwlb9l.png",
        "web_link": "https://www.dbs.com.sg/personal/insurance/protection/protection-plans/protection-hub?cid=sg:en:cbg:dbs:ptnr:own:pst:iapp:gi:insurance:na:mednefits",
        "promotional_link": true,
        "type": "dbs"
    },
    {
        "ClinicTypeID": "02",
        "Name": "More",
        "clinic_type_image_url": "https://res.cloudinary.com/mednefits-com/image/upload/v1564994547/services_v1/more_wsq4sr.png",
        "web_link": "",
        "promotional_link": true,
        "type": "more"
    },
    /*{
        "ClinicTypeID": "03",
        "Name": "Popup",
        "clinic_type_image_url": "https://img.icons8.com/wired/64/000000/details-popup.png",
        "web_link": "",
        "promotional_link": true,
        "type": "popup"
    }*/
    
]

/* AWS VARIABLE */
export let AWS_KEY                        = "AKIAI7NRA4S54ZAGYH5A"
export let AWS_SECRET                     = "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"
export let AWS_REGION                     = "us-east-1"
export let AWS_BUCKET                     = "mednefits-dev"
export let AWS_FOLDER                     = "receipts"

/* FONT FAMILY */
export let FONT_FAMILY                    = "HelveticaNeue"
export let FONT_FAMILY_REGULAR            = FONT_FAMILY+"-Regular"
export let FONT_FAMILY_LIGHT              = FONT_FAMILY+"-Light"
export let FONT_FAMILY_THIN               = FONT_FAMILY+"-Thin"
export let FONT_FAMILY_ROMAN              = FONT_FAMILY+"-Roman"
export let FONT_FAMILY_MEDIUM             = FONT_FAMILY+"-Medium"
export let FONT_FAMILY_BOLD               = FONT_FAMILY+"-Bold"
