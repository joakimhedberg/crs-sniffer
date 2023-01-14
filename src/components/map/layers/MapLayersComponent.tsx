interface IMapLayersComponentProps {

}

const MapLayersComponent = (p: React.PropsWithChildren<IMapLayersComponentProps>) => {
  return <div>{p.children}</div>
}

export default MapLayersComponent