import exp from "constants"
import { BorderBeam } from "../ui/border-beam"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

const BatchInfo = () => {
    return (
        <div className="swap__element flex-[0.65] relative">
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <BorderBeam size={250} duration={12} delay={9} className="rounded-md" />
          </div>
    )
}

export default BatchInfo;