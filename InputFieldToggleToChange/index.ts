import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class InputFieldToggleToChange implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;
    private _toggleBackground: HTMLDivElement;
    private _toggleSlider: HTMLDivElement;
    private _toggleButton: HTMLDivElement;
    private _toggleText: HTMLDivElement;
    // private _toggleBackgroundColor: HTMLDivElement;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        // Initialize Component variables
        this._notifyOutputChanged = notifyOutputChanged;
        this._context = context;
        this._container = container;

        // Create toggle background
        this._toggleBackground = document.createElement("div");
        this._toggleBackground.setAttribute("id", "toggleBackground");

        // this._toggleBackgroundColor = document.createElement("div");
        // this._toggleBackgroundColor.setAttribute("id", "toggleBackgroundColor");

        this._toggleBackground.style.backgroundColor = this._context.parameters.pBackgroundColor.raw || "rgb(198, 239, 206)";


        // Create toggle slider
        this._toggleSlider = document.createElement("div");
        this._toggleSlider.setAttribute("id", "toggleSlider");
        this._toggleSlider.addEventListener("click", this.onToggleSliderClick.bind(this));

        // Create toggle button
        this._toggleButton = document.createElement("div");
        this._toggleButton.setAttribute("id", "toggleButton");
        this._toggleSlider.appendChild(this._toggleButton);

        // Create toggle text
        this._toggleText = document.createElement("div");
        this._toggleText.setAttribute("id", "toggleText");
        this._toggleText.innerText = "Nein";

        // Append slider and text to background
        this._toggleBackground.appendChild(this._toggleSlider);
        this._toggleBackground.appendChild(this._toggleText);

        // Append background to container
        this._container.appendChild(this._toggleBackground);


    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update the view if needed
        const selectedValue = context.parameters.pToggle.raw;
        if (selectedValue) {
            this._toggleButton.style.transform = "translateX(calc(100% + 4px))";
            this._toggleText.innerText = "Ja";
        } else {
            this._toggleButton.style.transform = "translateX(0)";
            this._toggleText.innerText = "Nein";
        }
        this._toggleBackground.style.backgroundColor = this._context.parameters.pBackgroundColor.raw || "rgb(198, 239, 206)";
    }

    public getOutputs(): IOutputs {
        // Return the output values
        const booleanValue = this._toggleButton.style.transform === "translateX(calc(100% + 4px))";
        return {
            pToggle: booleanValue
        };
    }

    public destroy(): void { }

    private onToggleSliderClick(): void {
        // Handle toggle slider click
        if (this._toggleButton.style.transform === "translateX(calc(100% + 4px))") {
            this._toggleButton.style.transform = "translateX(0)";
            this._toggleText.innerText = "Nein";
        } else {
            this._toggleButton.style.transform = "translateX(calc(100% + 4px))";
            this._toggleText.innerText = "Ja";
        }
        this._notifyOutputChanged();
    }
}
