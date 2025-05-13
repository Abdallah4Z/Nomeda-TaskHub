import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'High' | 'Normal' | 'Low';
  assignees: string[]; // Temporarily using string names instead of ObjectIds
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  labels?: string[];
}

export interface IBlock extends Document {
  id: mongoose.Types.ObjectId;
  type: string; // e.g., 'note', 'chart', etc.
  title?: string;
  content: any; // Block content can be various types
  position: { x: number, y: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICalendarEvent extends Document {
  id: mongoose.Types.ObjectId;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description?: string;
  taskId?: mongoose.Types.ObjectId; // Reference to a task if applicable
  createdAt: Date;
  updatedAt: Date;
}

export interface IFile extends Document {
  id: mongoose.Types.ObjectId;
  name: string;
  url: string;
  type: string; // MIME type
  size: number; // File size in bytes
  createdAt: Date;
  updatedBy: mongoose.Types.ObjectId;
}

export interface IProject extends Document {
  name: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  tasks: ITask[];
  blocks: IBlock[];
  calendarEvents: ICalendarEvent[];
  files: IFile[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'review', 'done'], 
    default: 'todo' 
  },
  priority: { 
    type: String, 
    enum: ['High', 'Normal', 'Low'], 
    default: 'Normal' 
  },
  assignees: [{ type: String }], // Temporarily using string names instead of User references
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  labels: [{ type: String }]
});

const BlockSchema = new Schema<IBlock>({
  type: { type: String, required: true },
  title: { type: String },
  content: { type: Schema.Types.Mixed },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const CalendarEventSchema = new Schema<ICalendarEvent>({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  allDay: { type: Boolean, default: false },
  description: { type: String },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const FileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [TaskSchema],
  blocks: [BlockSchema],
  calendarEvents: [CalendarEventSchema],
  files: [FileSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;