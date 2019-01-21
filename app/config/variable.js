/*
* @author detatsatrio
* @year 2018
*/

export const MAIN                           = 'http://staging.medicloud.sg/v2';
export const CLIENT_SECRET                  = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';
export const CLIENT_ID                      = 'cfcd208495d565ef66e7dff9f98764da';

/** AUTHENTICATION VARIABLE */
export const AUTH                           = MAIN + '/auth';
export const AUTH_LOGIN                     = AUTH + '/login';
export const AUTH_USER_PROFILE              = AUTH + '/userprofile';
export const AUTH_CARD_DETAILS              = AUTH + '/e_card_details';
export const AUTH_NEW_HISTORY               = AUTH + '/newhistory';
export const AUTH_NEW_ALLERGY               = AUTH + '/newallergy';
export const AUTH_NEW_CONDITION             = AUTH + '/newcondition';
export const AUTH_NEW_MEDICATION            = AUTH + '/newmedication';
export const AUTH_DELETE_ALLERGY            = AUTH + '/deleteallergy';
export const AUTH_DELETE_CONDITION          = AUTH + '/deletecondition';
export const AUTH_DELETE_MEDICATION         = AUTH + '/deletemedication';
export const AUTH_DELETE_HISTORY            = AUTH + '/deletehistory';
export const AUTH_UPDATE                    = AUTH + '/update';
export const AUTH_CHANGE_PASSWORD           = AUTH + '/change-password';

/** CLINIC VARIABLE */
export const CLINIC                         = MAIN + '/clinic';
export const CLINIC_SEARCH                  = CLINIC + '/search';
export const CLINIC_CLINIC_DETAILS          = CLINIC + '/clinicdetails';
export const CLINIC_NEW_NEARBY              = CLINIC + '/new_nearby';
export const CLINIC_PROCEDURE_DETAILS       = CLINIC + '/procedure_details';
export const CLINIC_DOCTOR_PROCEDURE        = CLINIC + '/doctor_procedure';
export const CLINIC_CLINIC_TYPE             = CLINIC + '/clinic_type';
export const CLINIC_DETAILS                 = CLINIC + '/details';
export const CLINIC_NEARBY                  = CLINIC + '/nearby';
export const CLINIC_MAIN_SEARCH             = CLINIC + '/main_search';
export const CLINIC_SET_FAVOURITE           = CLINIC + '/favourite';
export const CLINIC_GET_FAVOURITE           = CLINIC + '/get_favourite_clinics';
export const CLINIC_SEND_PAYMENT            = CLINIC + '/send_payment';
export const CLINIC_PAYMENT_DIRECT          = CLINIC + '/payment_direct';

/* USER VARIABLE */
export const USER                           = MAIN+"/user"
export const USER_CREDITS                   = USER+"/credits"
export const USER_NETWORK_TRANSACTION       = USER+"/in_network_transactions"
export const USER_SPECIFIC_IN_NETWORK       = USER+"/specific_in_network"
export const USER_ECLAIM_TRANSACTION        = USER+"/e_claim_transactions"
export const USER_SPECIFIC_E_CLAIM          = USER+"/specific_e_claim_transaction"
export const USER_CREATE_E_CLAIM            = USER+"/create_e_claim"
export const USER_HEALT_TYPE_LIST           = USER+"/health_type_lists"
export const USER_UPLOAD_IN_NETWORK_RECEIPT = USER+"/upload_in_network_receipt"
export const USER_SAVE_OUT_NETWORK_RECEIPT  = USER+"/save_out_of_network_receipt"
export const USER_MEMBERLIST                = USER+"/member_lists"

/* LOCAL VARIABLE */
export const ACCESS_TOKEN                   = "access_token"

/* AWS VARIABLE */
export const AWS_KEY                        = "AKIAI7NRA4S54ZAGYH5A"
export const AWS_SECRET                     = "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"
export const AWS_REGION                     = "us-east-1"
export const AWS_BUCKET                     = "mednefits-dev"
export const AWS_FOLDER                     = "receipts"

/* FONT FAMILY */
export const FONT_FAMILY                    = "HelveticaNeue"
export const FONT_FAMILY_REGULAR            = FONT_FAMILY+"-Regular"
export const FONT_FAMILY_LIGHT              = FONT_FAMILY+"-Light"
export const FONT_FAMILY_THIN               = FONT_FAMILY+"-Thin"
export const FONT_FAMILY_ROMAN              = FONT_FAMILY+"-Roman"
export const FONT_FAMILY_MEDIUM             = FONT_FAMILY+"-Medium"
export const FONT_FAMILY_BOLD               = FONT_FAMILY+"-Bold"
