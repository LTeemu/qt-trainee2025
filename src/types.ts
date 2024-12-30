export type AlertType = 'success' | 'error' | 'info';

export type AlertState = {
  type: AlertType;
  message: string | React.ReactNode;
  isVisible: boolean;
};

export type AlertProps = {
  type: AlertType;
  message: string | React.ReactNode;
  onClose: () => void;
  containerClassName?: string;
  title?: string;
  id?: string;
};

export type ProtectedRouteProps = {
  element: React.ReactElement;
};

export type Device = {
  id: number;
  type: string;
  versions: string[];
  count: number;
  available: number;
};

export type Reservation = {
  reservation_id: string;
  reservation_time: string;
  reservation_duration: number;
  reservation_reason: string;
  device_id: number;
  device_type: string;
  device_version: string;
};

export type ReserveFormState = {
  qtversion: string;
  duration: number;
  reason: string;
};

export type DashboardTableRef = {
  refresh: () => void;
};
