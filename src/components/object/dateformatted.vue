<template>

    <p>
        {{ formattedDate }}
    </p>

</template>

<script>
export default {
    name: 'FormattedDate',
    props: {
        dateString: {
            type: String,
            required: true
        }
    },
    computed: {
        formattedDate() {
            return this.formatDate(this.dateString);
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);

            const options = {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const formatter = new Intl.DateTimeFormat('th-TH', options);
            const parts = formatter.formatToParts(date);

            const formattedDate = parts.map(part => {
                if (part.type === 'year') {
                    return (parseInt(part.value) + 543).toString().slice(-2);
                }
                return part.value;
            }).join('');

            return formattedDate;
        }
    }
}
</script>