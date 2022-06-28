import { ChangeEvent } from "../Types/TypesAliases";

export function ImageInput({ handleFile }: { handleFile: (e: ChangeEvent) => void}) {
  return (
    <div className="file is-info">
      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="resume"
          onChange={handleFile}
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">Cargar Evidencia</span>
        </span>
      </label>
    </div>
  );
}
