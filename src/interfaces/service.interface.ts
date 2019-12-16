export interface IServiceFilter {
  type: 'rent' | 'sale';
  limit: number;
  offset: number;
  service: 'zap' | 'viva-real';
}