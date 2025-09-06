export type Question = {
  id: string;
  text: string;
  type: 'multiple-choice' | 'slider' | 'text' | 'rating';
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
};

export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: Date;
  time: string;
  type: 'in-person' | 'virtual';
};

export type Message = {
    id: string;
    from: 'user' | 'bot';
    text: string;
}
