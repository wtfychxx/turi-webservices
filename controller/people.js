import db from '../helper/database.js'

const getPeople = async(request, response) => {
    const { familyCardNumber } = request.params

    await db.query(`SELECT
                        id,
                        name_first as "nameFirst",
                        name_middle as "nameMiddle",
                        name_last as "nameLast",
                        name_official as "nameOfficial",
                        idcard_number as "idCardNumber",
                        (select name from master_data_language where data__id = gender__id and language__id = 2) as gender,
                        birth_place as "birthPlace",
                        to_char(birth_date, 'dd Month yyyy') as "birthDate",
                        (select name from master_data_language where data__id = religion__id and language__id = 2) as religion,
                        (select name from master_data_language where data__id = education__id and language__id = 2) as education,
                        case occupation__id when 39 then occupation_name else (select name from master_data_language where data__id = occupation__id and language__id = 2) end as occupation,
                        coalesce((select name from master_data_language where data__id = blood_type__id and language__id = 2), '-') as "bloodType",
                        (select name from master_data_language where data__id = marital_status__id and language__id = 2) as "maritalStatus",
                        coalesce(to_char(marital_date, 'dd Month yyyy'), '-') as "maritalDate",
                        coalesce(marital_place, '-') as "maritalPlace",
                        (select name from master_data_language where data__id = family_status__id and language__id = 2) as "familyStatus",
                        (select name from master_data_language where data__id = nationality__id and language__id = 2) as "nationality"
                        FROM master_warga where family_card_number = $1 order by id`, [familyCardNumber], (error, results) => {
        if (error) {
            response.status(500).json({
                message: "Oops..ada yang salah dengan sistem!",
                errorMessage: error.stack,
                code: 500
            })
            return
        }

        response.status(200).json({
            message: 'Success',
            code: 200,
            results: results.rows
        })
    })
}

export { getPeople }