import BaseModel from './base.model';

export default class EvaluationFormModel extends BaseModel {

    _rev;
    group_id;
    type;
    date;
    _id;

    air_score = '';
    boar_stimulation_score = '';
    body_score_entry_score = '';
    body_score_end_score = '';
    body_score_middle_score = '';
    creep_feed_score = '';
    cutting_edges_score = '';
    feed_score = '';
    feeders_score = '';
    fight_signs_score = '';
    floor_score = '';
    gilt_growth_score = '';
    hygiene_score = '';
    light_score = '';
    management_score = '';
    person_contact_score = '';
    pds_score = '';
    piglets_score = '';
    quarentine_score = '';
    rest_areas_score = '';
    split_suckling_management_score = '';
    temperature_score = '';
    ventilation_score = '';

    air_score_comments = '';
    boar_stimulation_score_comments = '';
    body_score_entry_score_comments = '';
    body_score_end_score_comments = '';
    body_score_middle_score_comments = '';
    creep_feed_score_comments = '';
    cutting_edges_score_comments = '';
    feed_score_comments = '';
    feeders_score_comments = '';
    fight_signs_score_comments = '';
    floor_score_comments = '';
    gilt_growth_score_comments = '';
    hygiene_score_comments = '';
    light_score_comments = '';
    management_score_comments = '';
    person_contact_score_comments = '';
    pds_score_comments = '';
    piglets_score_comments = '';
    quarentine_score_comments = '';
    rest_areas_score_comments = '';
    split_suckling_management_score_comments = '';
    temperature_score_comments = '';
    ventilation_score_comments = '';


    rules = () => {
        return {
            type: ['required'],
            _id: [],
            _rev: [],
            group_id: [],
            date: ['required'],
            air_score: [],
            boar_stimulation_score: [],
            body_score_entry_score: [],
            body_score_end_score: [],
            body_score_middle_score: [],
            creep_feed_score: [],
            cutting_edges_score: [],
            feed_score: [],
            feeders_score: [],
            fight_signs_score: [],
            floor_score: [],
            gilt_growth_score: [],
            hygiene_score: [],
            light_score: [],
            management_score: [],
            person_contact_score: [],
            pds_score: [],
            piglets_score: [],
            quarentine_score: [],
            rest_areas_score: [],
            split_suckling_management_score: [],
            temperature_score: [],
            ventilation_score: [],

            air_score_comments: [],
            boar_stimulation_score_comments: [],
            body_score_entry_score_comments: [],
            body_score_end_score_comments: [],
            body_score_middle_score_comments: [],
            creep_feed_score_comments: [],
            cutting_edges_score_comments: [],
            feed_score_comments: [],
            feeders_score_comments: [],
            fight_signs_score_comments: [],
            floor_score_comments: [],
            gilt_growth_score_comments: [],
            hygiene_score_comments: [],
            light_score_comments: [],
            management_score_comments: [],
            person_contact_score_comments: [],
            pds_score_comments: [],
            piglets_score_comments: [],
            quarentine_score_comments: [],
            rest_areas_score_comments: [],
            split_suckling_management_score_comments: [],
            temperature_score_comments: [],
            ventilation_score_comments: []
        }
    }

    save = async () => {
       


    }
}