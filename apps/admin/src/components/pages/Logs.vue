<script>
import LogRow from '../molecules/LogRow.vue'
import TableList from '../organisms/TableList.vue'

export default {
  props: ['logs'],
  components: { LogRow, TableList },
}
</script>

<template>
  <div class="w-full p-10" id="logs">
    <div class="text-3xl font-bold">Logs</div>
    <div class="divider"></div>
    <div class="overflow-x-auto">
      <TableList
        :headers="['', 'Movie', 'Description', 'Created At', 'Updated By']"
        :compact="true"
      >
        <LogRow
          v-for="(log, index) in logs"
          :key="'log-' + log.id"
          :log="log"
          :index="index"
        />
      </TableList>
    </div>
  </div>
</template>
