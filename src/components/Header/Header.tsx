import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
interface IHeader {
  isConnected: boolean;
  connectServer: () => void;
  disconnectServer: () => void;
}
export const Header = ({
  isConnected,
  connectServer,
  disconnectServer,
}: IHeader) => {
  return (
    <header>
      <div>
        <div>
          <div>
            {isConnected ? (
              <FontAwesomeIcon icon={solid("circle-check")} color="#22BB33" />
            ) : (
              <FontAwesomeIcon
                icon={solid("triangle-exclamation")}
                color="#BB2124"
              />
            )}
            <label>{isConnected ? "Conexão ativa" : "Conexão inativa"}</label>{" "}
            {isConnected ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={disconnectServer}
              >
                Desativar Conexão
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={connectServer}
              >
                Ativar Conexão
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
