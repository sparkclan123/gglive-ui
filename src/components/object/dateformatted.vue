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
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            };
            const formatter = new Intl.DateTimeFormat('th-TH', options);
            const parts = formatter.formatToParts(date);

            const formattedDate = parts.map(part => {
                if (part.type === 'year') {
                    return (parseInt(part.value) - 543).toString();
                }
                return part.value;
            }).reduce((string, part, index, array) => {
                if (array[index - 1] && array[index - 1].type === 'literal' && array[index - 1].value === "/") {
                    return string + part;
                }
                return string + (part.type === 'literal' && part.value === ":" ? "" : part);
            }, '');

            return formattedDate;
        }
    }
}
</script>
