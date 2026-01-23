//this helper maps the relevant properties of the PlantDto (from response.data from requests to backend) to the formState since the Dto can not
//not be used directedly to prefill this form
export default function mapPlantDtoToFormState(dto) {
    return {
        //toplevel simple plant properties, id is ignored
        dutchName: dto.dutchName ?? "",
        latinName: dto.latinName ?? "",
        description: dto.description ?? "",
        bloomColorHex: dto.bloomColorHex ?? "",
        bloomColorGroup: dto.bloomColorGroup ?? null,
        published: dto.published ?? true,

        // convert "number" from backend response to "string" for the form input field
        height: dto.height !== null && dto.height !== undefined
            ? String(dto.height)
            : "",
        footprint: dto.footprint !== null && dto.footprint !== undefined
            ? String(dto.footprint)
            : "",

        //map sub object localeDto
        localeDto: {
            sunlight: dto.localeDto?.sunlight ?? null,
            moisture: dto.localeDto?.moisture ?? null,
            windTolerance: dto.localeDto?.windTolerance ?? null,
            soilType: dto.localeDto?.soilType ?? "",
            openGroundOnly: dto.localeDto?.openGroundOnly ?? false,
        },
        //map sub object blooming calendar
        bloomingCalendarDto: {
            january: dto.bloomingCalendarDto?.january ?? false,
            february: dto.bloomingCalendarDto?.february ?? false,
            march: dto.bloomingCalendarDto?.march ?? false,
            april: dto.bloomingCalendarDto?.april ?? false,
            may: dto.bloomingCalendarDto?.may ?? false,
            june: dto.bloomingCalendarDto?.june ?? false,
            july: dto.bloomingCalendarDto?.july ?? false,
            august: dto.bloomingCalendarDto?.august ?? false,
            september: dto.bloomingCalendarDto?.september ?? false,
            october: dto.bloomingCalendarDto?.october ?? false,
            november: dto.bloomingCalendarDto?.november ?? false,
            december: dto.bloomingCalendarDto?.december ?? false,
        },//plantAvatarDto is ignored (not needed for form)
    };
}
