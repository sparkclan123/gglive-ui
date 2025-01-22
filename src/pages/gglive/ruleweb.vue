<template>
    <div>
        <div class="content-style">
            <div class="flex justify-center items-center h-8">
                <span class="text-gray-800 text-2xl font-bold">System Rules</span>
            </div>
            <div class="mt-4 px-6 text-gray-600">
                <p>
                    - The rankings of players who have created teams will be arranged according to <span
                        class="text-green-900">points</span> from highest to lowest. In cases where multiple players
                    have the same <span class="text-green-900">points</span>, the rankings will be determined by the
                    amount of money spent on team creation. Players who spend less will be ranked higher.
                </p>
                <p class="mt-4">
                    - If players still have the same <span class="text-green-900">points</span> and amount of money
                    spent, the rankings will be determined based on the time the team was submitted. <span
                        class="text-red-900">Editing players in the team after submission will update the submission
                        time.</span>
                </p>
                <p class="mt-4">
                    - <span class="text-blue-900">Once players or tickets have been selected, cancellations are not
                        allowed.</span> If a team cancels a match for that week due to any reason (based on the Premier
                    League schedule) and the match is rescheduled to the beginning of the following week, we will
                    postpone the score summary to after the last match concludes. However, if the match is postponed
                    indefinitely, players you selected from that team will receive 0 points.
                </p>
                <p class="mt-4 font-semibold">
                    - Thank you for your support. We will do our best to ensure you enjoy managing your competitions.
                </p>
                <!-- Consent policy and non-refundable policy -->
                <p class="mt-4">
                    - <span class="text-red-900">Consent Policy</span>: Once you purchase a ticket to participate,
                    refunds are not allowed under any circumstances. By doing so, you consent to allow us to access your
                    information in the system. We reserve the right to not disclose your personal information to third
                    parties under any circumstances to ensure the safety and privacy of your data.
                </p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.content-style {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
}

.text-gray-800 {
    color: #2d3748;
}

.text-gray-600 {
    color: #718096;
}

.text-green-900 {
    color: #22543d;
}

.text-blue-900 {
    color: #2a4365;
}

.text-red-900 {
    color: #742a2a;
}

.font-bold {
    font-weight: 700;
}

.font-semibold {
    font-weight: 600;
}

.mt-4 {
    margin-top: 1rem;
}

.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}
</style>
