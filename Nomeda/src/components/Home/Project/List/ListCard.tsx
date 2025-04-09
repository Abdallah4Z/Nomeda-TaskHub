import { Card } from '@mui/material'
import ListCardTitle from './ListCardTitle'
import ListCardAssignees from './ListCardAssignees'
import ListCardTime from './ListCardTime'
import ListCardLabel from './ListCardLabel'
import ListCardActions from './ListCardActions'
import PriorityLabel from '../../../Tasks/PriorityLabel'

const ListCard = ({ task }: { task: any }) => (
  <Card
    variant="outlined"
    sx={{
      display: 'flex',
      alignItems: 'center',
      paddingY: 1,
      paddingX: 2,
      marginBottom: 1,
      borderRadius: 2,
      color:'gray'
    }}
  >
    <ListCardTitle title={task.title} />
    <ListCardAssignees users={task.users} />
    <ListCardTime time={task.assignedAt} />
    <ListCardLabel />
    <PriorityLabel level={task.priority} />
    <ListCardActions />
  </Card>
)

export default ListCard
