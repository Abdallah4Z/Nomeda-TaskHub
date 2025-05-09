export interface FormattingOptions {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    color: string;
    align: 'left' | 'center' | 'right' | 'justify';
    heading: string;
  }
  
  export interface EditorSettings {
    autosave: boolean;
    autosaveInterval: number;
    darkMode: boolean;
    fontSize: number;
  }
  
  export interface HistoryItem {
    content: string;
    timestamp: number;
    cursor?: number;
  }
  
  export interface DropdownMenuItem {
    label: string;
    action: () => void;
  }
  
  export interface TextComponentProps {
    id: number;
    content: string;
    onChange: (id: number, content: string) => void;
    onDelete?: (id: number) => void;
    dropdownMenuItems?: DropdownMenuItem[];
  }