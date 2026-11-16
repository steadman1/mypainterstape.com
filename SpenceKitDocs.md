Here is the concise Markdown documentation for the provided Swift `Card` view.

```markdown
# `Card` View

The `Card` view is a versatile container used to define paired content, such as a title-body combination, with customizable footers (chips or buttons). It supports different styles defined by `SpenceKitStyle`.

## Declaration

```swift
public struct Card<ContentBody: View, ContentFooter: View>: View
```

### Type: Mixture
- Combines **Elements** (e.g., text, buttons, chips) and **Compounds**.

---

## Initializers

### 1. Standard Card
Defines a `Card` with a body and footer.

```swift
public init(
    _ style: SpenceKitStyle = .primary,
    @ViewBuilder body: @escaping () -> ContentBody,
    @ViewBuilder footer: @escaping () -> ContentFooter
)
```

#### Parameters
- `style`: *(Optional)* The style of the card, defined by `SpenceKitStyle`. Defaults to `.primary`.
- `body`: A closure returning the main content of the card.
- `footer`: A closure returning the footer content, which can include chips, buttons, or other views.

---

### 2. Chips-Based Footer *(Not yet implemented)*
Defines a `Card` where the footer is built using a collection of chips.

```swift
public init(
    @ViewBuilder body: @escaping () -> ContentBody,
    @ViewBuilder chips: @escaping () -> ContentFooter
)
```

#### Parameters
- `body`: A closure returning the main content of the card.
- `chips`: A closure returning a collection of chips displayed in the footer.

---

## Usage

### Example 1: Primary Style with Footer
```swift
Card(SpenceKitStyle.primary) {
    VStack {
        Text("Testing Card")
            .font(.SpenceKit.SerifPrimaryTitleFont)
        Text("Placeholder text for the card body.")
            .font(.SpenceKit.SansBodyFont)
    }
} footer: {
    HStack {
        LargeChip("Option 1", style: .CTA)
        LargeChip("Option 2", style: .CTA)
    }
}.frame(width: 200, height: 300)
```

### Example 2: CTA Style with Expanding Button
```swift
Card(SpenceKitStyle.CTA) {
    Text("Testing Card")
        .font(.SpenceKit.SerifPrimaryTitleFont)
    Text("Placeholder text for the card body.")
        .font(.SpenceKit.SansBodyFont)
} footer: {
    ExpandingButton(.CTA) {
        print("Button clicked")
    } label: {
        HStack {
            SFIcon("checkmark", size: .head)
            Text("Done")
                .font(.SpenceKit.SansHeadlineFont)
        }
    }
}
```

---

## Notes
- The `Card` view dynamically adjusts its layout based on the `SpenceKitStyle`.
- Background color and border are defined by `SpenceKit` constants.
- Footers adapt their padding based on the style (`.CTA`, `.primary`, etc.).

---

## Private Methods

### `getTextLabel(for:with:)`
Generates a styled `Text` view for a given string and style.

```swift
private static func getTextLabel(for text: String, with style: SpenceKitStyle) -> Text
```

#### Parameters
- `text`: The string content to be displayed.
- `style`: The `SpenceKitStyle` that determines the text's font and foreground color.

---

## Preview
The `Card` view supports multiple use cases, as shown in the provided previews:

1. `.CTA` style with a button footer.
2. `.primary` style with a chip footer.
```swift
@available(iOS 16.0, *)
#Preview {
    // Example previews
}
```
```