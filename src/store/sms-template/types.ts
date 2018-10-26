
export const GET_SMS_TEMPLATE = 'GET_SMS_TEMPLATE';
export const EDIT_SMS_TEMPLATE = 'EDIT_SMS_TEMPLATE';


// Store

export interface StateSmsTemplate {
    smsTemplate: SmsTemplate;
}

// Models

export interface SmsTemplate {
    income_template: string;
    income_status: number;
    income_reject_reason: string;
    done_template: string;
    done_status: number;
    done_reject_reason: string;
    feedback_template: string;
    feedback_status: number;
    feedback_reject_reason: string;
    master_template: string;
    master_status: number;
    master_reject_reason: string;
}