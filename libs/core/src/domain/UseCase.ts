export interface IUseCase<ICommand, IResponse> {
  execute(request?: ICommand): IResponse | Promise<IResponse>;
}
